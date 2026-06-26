import { useState, useRef, useEffect, DragEvent, ChangeEvent } from 'react';
import { uploadMeeting } from '../api';
import { UploadResponse } from '../types';
import { Upload as UploadIcon, FileAudio, X, Loader2, FileText, CheckSquare, Mail, AlignLeft, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContentCard } from '../components/ui/Card';
import { ActionItemList } from '../components/ui/ActionItemList';

export function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/x-m4a', 'audio/m4a'];
    const validExtensions = ['.mp3', '.wav', '.m4a'];
    
    if (!validTypes.includes(file.type) && !validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
      toast.error('Invalid file type. Please upload MP3, WAV, or M4A.');
      return false;
    }
    return true;
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setProgress(0);
    setResult(null);

    // Simulate smoother progress for steps
    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
          return 90;
        }
        return prev + 5;
      });
    }, 500);

    try {
      const response = await uploadMeeting(file, () => {});
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      setProgress(100);
      setTimeout(() => {
        setResult(response);
        toast.success('Meeting analyzed successfully!');
        setUploading(false);
      }, 500);
    } catch (error) {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      console.error('Upload failed', error);
      toast.error('Failed to process meeting. Please try again.');
      setUploading(false);
      setProgress(0);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Upload Meeting</h1>
        <p className="text-slate-500 mt-1">Upload your audio recording to generate intelligence.</p>
      </div>

      {!result && (
        <div className="max-w-2xl bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <div 
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 ${
              dragActive ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".mp3,.wav,.m4a,audio/*"
              onChange={handleChange}
              disabled={uploading}
            />
            
            {!file ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-blue-600">
                  <UploadIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-slate-900 font-medium text-lg">Click to upload or drag and drop</p>
                  <p className="text-slate-500 text-sm mt-1">Supports MP3, WAV, M4A</p>
                </div>
                <button 
                  onClick={() => inputRef.current?.click()}
                  className="mt-4 px-6 py-2.5 rounded-md bg-white border border-slate-200 shadow-sm text-slate-700 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  Browse Files
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 bg-white w-full max-w-md shadow-sm">
                  <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <FileAudio className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  {!uploading && (
                    <button onClick={removeFile} className="p-2 text-slate-400 hover:text-red-500 transition-colors bg-slate-50 hover:bg-red-50 rounded-md">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {uploading ? (
                  <div className="w-full max-w-md space-y-5">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="space-y-3 text-sm text-slate-600 text-left">
                      <div className="flex items-center gap-3">
                        {progress > 10 ? <Check className="w-5 h-5 text-green-600 bg-green-50 rounded-full p-0.5" /> : <Loader2 className="w-5 h-5 animate-spin text-blue-600" />}
                        <span className={progress > 10 ? 'text-slate-900 font-medium' : 'text-slate-700 font-medium'}>Uploading audio file</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {progress > 40 ? <Check className="w-5 h-5 text-green-600 bg-green-50 rounded-full p-0.5" /> : (progress > 10 ? <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-200" />)}
                        <span className={progress > 40 ? 'text-slate-900 font-medium' : (progress > 10 ? 'text-slate-700 font-medium' : 'text-slate-400')}>Transcribing audio with Whisper</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {progress > 70 ? <Check className="w-5 h-5 text-green-600 bg-green-50 rounded-full p-0.5" /> : (progress > 40 ? <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-200" />)}
                        <span className={progress > 70 ? 'text-slate-900 font-medium' : (progress > 40 ? 'text-slate-700 font-medium' : 'text-slate-400')}>Generating summary & action items with Groq</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {progress >= 100 ? <Check className="w-5 h-5 text-green-600 bg-green-50 rounded-full p-0.5" /> : (progress > 70 ? <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-200" />)}
                        <span className={progress >= 100 ? 'text-slate-900 font-medium' : (progress > 70 ? 'text-slate-700 font-medium' : 'text-slate-400')}>Creating follow-up email</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={handleUpload}
                    className="w-full max-w-md px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <UploadIcon className="w-4 h-4" />
                    Upload and Analyze
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Analysis Results</h2>
            <button 
              onClick={() => setResult(null)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-white border border-slate-200 px-4 py-2 rounded-md shadow-sm hover:shadow transition-all"
            >
              Analyze New Meeting
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <ContentCard 
              title="Meeting Summary" 
              icon={<AlignLeft className="w-4 h-4 text-blue-600" />}
              copyText={result.summary}
              className="lg:col-span-2"
              collapsible
            >
              <div className="whitespace-pre-wrap text-slate-700 text-sm leading-relaxed">{result.summary}</div>
            </ContentCard>

            <ContentCard 
              title="Action Items" 
              icon={<CheckSquare className="w-4 h-4 text-blue-600" />}
              copyText={result.action_items.map(i => `- [ ] ${i.task} (@${i.owner}) - Due: ${i.deadline}`).join('\n')}
              collapsible
            >
              <ActionItemList items={result.action_items} />
            </ContentCard>

            <ContentCard 
              title="Follow-up Email" 
              icon={<Mail className="w-4 h-4 text-blue-600" />}
              copyText={result.email}
              collapsible
              className="lg:col-span-2"
            >
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-full max-h-full w-full mx-auto">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">Follow-up: {result.original_filename}</p>
                  </div>
                  <p className="text-xs text-slate-500">To: Meeting Attendees</p>
                </div>
                <div className="p-5 overflow-y-auto">
                  <div className="whitespace-pre-wrap font-sans text-slate-700 text-sm leading-relaxed">
                    {result.email || "No follow-up email generated."}
                  </div>
                </div>
              </div>
            </ContentCard>

            <ContentCard 
              title="Transcript" 
              icon={<FileText className="w-4 h-4 text-blue-600" />}
              copyText={result.transcript}
              className="lg:col-span-2"
              collapsible
            >
              <div className="whitespace-pre-wrap max-h-96 overflow-y-auto pr-2 custom-scrollbar text-slate-700 text-sm leading-relaxed">
                {result.transcript}
              </div>
            </ContentCard>
          </div>
        </div>
      )}
    </div>
  );
}
