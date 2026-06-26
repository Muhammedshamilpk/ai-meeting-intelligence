import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMeeting } from '../api';
import { Meeting } from '../types';
import { ArrowLeft, Calendar, FileAudio, CheckSquare, Mail, FileText, AlignLeft } from 'lucide-react';
import { formatDate } from '../utils';
import { Skeleton } from '../components/ui/Skeleton';
import { ActionItemList } from '../components/ui/ActionItemList';
import { EmailPreview } from '../components/ui/EmailPreview';
import toast from 'react-hot-toast';

export function MeetingDetails() {
  const { id } = useParams<{ id: string }>();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'summary' | 'actionItems' | 'email' | 'transcript'>('summary');

  useEffect(() => {
    const fetchMeeting = async () => {
      if (!id) return;
      try {
        const data = await getMeeting(parseInt(id));
        setMeeting(data);
      } catch (err) {
        console.error('Failed to load meeting', err);
        setError('Could not find meeting details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeeting();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col gap-4">
          <Link to="/history" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 w-fit transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to History
          </Link>
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <Skeleton className="h-8 w-1/3" />
            <div className="flex items-center gap-6 mt-4 text-sm text-slate-500">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
           <div className="flex items-center border-b border-slate-200 px-2 overflow-x-auto gap-4 py-3">
             <Skeleton className="h-6 w-24" />
             <Skeleton className="h-6 w-32" />
             <Skeleton className="h-6 w-32" />
             <Skeleton className="h-6 w-24" />
           </div>
           <div className="p-6 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
           </div>
        </div>
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4">
          <FileAudio className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Meeting Not Found</h2>
        <p className="text-slate-500 mb-6">{error || "The meeting you're looking for doesn't exist."}</p>
        <Link to="/history" className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">
          Back to History
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        <Link to="/history" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 w-fit transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to History
        </Link>
        
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {meeting.original_filename}
          </h1>
          <div className="flex items-center gap-6 mt-4 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              {formatDate(meeting.uploaded_at)}
            </span>
            <span className="flex items-center gap-2">
              <FileAudio className="w-4 h-4 text-slate-400" />
              ID: {meeting.meeting_id || meeting.id}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
        <div className="flex items-center border-b border-slate-200 px-2 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'summary' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <AlignLeft className="w-4 h-4" /> Summary
          </button>
          <button 
            onClick={() => setActiveTab('actionItems')}
            className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'actionItems' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <CheckSquare className="w-4 h-4" /> Action Items
          </button>
          <button 
            onClick={() => setActiveTab('email')}
            className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'email' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Mail className="w-4 h-4" /> Follow-up Email
          </button>
          <button 
            onClick={() => setActiveTab('transcript')}
            className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'transcript' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" /> Transcript
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {activeTab === 'summary' && (
            <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-li:my-1 text-slate-700 text-sm">
              <div className="whitespace-pre-wrap">{meeting.summary || "No summary available."}</div>
            </div>
          )}

          {activeTab === 'actionItems' && (
            <ActionItemList items={meeting.action_items} />
          )}

          {activeTab === 'email' && (
            <EmailPreview email={meeting.email} originalFilename={meeting.original_filename} />
          )}

          {activeTab === 'transcript' && (
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 h-full overflow-y-auto custom-scrollbar">
              <div className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed">
                {meeting.transcript || "No transcript available."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
