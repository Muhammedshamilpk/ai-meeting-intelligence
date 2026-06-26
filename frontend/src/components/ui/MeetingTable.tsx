import { Link } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import { Meeting } from '../../types';
import { formatDate } from '../../utils';
import { Skeleton } from './Skeleton';

interface MeetingTableProps {
  meetings: Meeting[];
  loading?: boolean;
  showActions?: boolean;
  onDelete?: (id: number) => void;
  skeletonRows?: number;
}

export function MeetingTable({ meetings, loading, showActions = false, onDelete, skeletonRows = 5 }: MeetingTableProps) {
  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-medium">Meeting ID</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Filename</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">{showActions ? 'Actions' : 'Action'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[...Array(skeletonRows)].map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                <td className="px-6 py-4"><Skeleton className="h-4 w-48" /></td>
                <td className="px-6 py-4"><Skeleton className="h-5 w-20 rounded-full" /></td>
                <td className="px-6 py-4 flex justify-end">
                  {showActions ? (
                    <div className="flex gap-3"><Skeleton className="h-4 w-4" /><Skeleton className="h-4 w-4" /></div>
                  ) : (
                    <Skeleton className="h-4 w-16" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 font-medium">Meeting ID</th>
            <th className="px-6 py-3 font-medium">Date</th>
            <th className="px-6 py-3 font-medium">Filename</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium text-right">{showActions ? 'Actions' : 'Action'}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {meetings.map(meeting => (
            <tr key={meeting.id || meeting.meeting_id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">
                {meeting.meeting_id || meeting.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(meeting.uploaded_at)}
              </td>
              <td className="px-6 py-4 font-medium text-slate-900 max-w-[200px] truncate" title={meeting.original_filename}>
                {meeting.original_filename}
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  Processed
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                {showActions ? (
                  <div className="flex items-center justify-end gap-3">
                    <Link 
                      to={`/meeting/${meeting.id || meeting.meeting_id}`}
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button 
                      className="text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete Meeting"
                      onClick={() => onDelete?.(meeting.id || meeting.meeting_id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Link 
                    to={`/meeting/${meeting.id || meeting.meeting_id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-end gap-1 hover:underline"
                  >
                    <Eye className="w-4 h-4" /> View Details
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
