import { Copy, Download } from 'lucide-react';
import toast from 'react-hot-toast';

interface EmailPreviewProps {
  email: string;
  originalFilename: string;
}

export function EmailPreview({ email, originalFilename }: EmailPreviewProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-full max-h-full max-w-4xl mx-auto w-full">
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-slate-900">Subject: Follow-up from {originalFilename}</p>
          <p className="text-xs text-slate-500">To: Meeting Attendees</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(email);
              toast.success("Email copied to clipboard");
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded transition-colors"
            title="Copy Email"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button 
            onClick={() => toast.success("Email downloaded")}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded transition-colors"
            title="Download Email"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-6 overflow-y-auto">
        <div className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed">
          {email || "No follow-up email generated."}
        </div>
      </div>
    </div>
  );
}
