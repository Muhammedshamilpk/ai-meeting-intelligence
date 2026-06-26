import { useEffect, useState } from 'react';
import { getMeetings,deleteMeeting } from '../api';
import { Meeting } from '../types';
import { Link } from 'react-router-dom';
import { Video, Search } from 'lucide-react';
import { MeetingTable } from '../components/ui/MeetingTable';
import toast from 'react-hot-toast';

export function HistoryPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await getMeetings();
        setMeetings(data);
      } catch (err) {
        console.error('Failed to load meetings', err);
        setError('Failed to load meeting history. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this meeting?")) {
        return;
    }

    try {
        await deleteMeeting(id);

        setMeetings((prev) => prev.filter((meeting) => meeting.id !== id));

        toast.success("Meeting deleted successfully.");
    } catch (err) {
        console.error(err);
        toast.error("Failed to delete meeting.");
    }
};

  const filteredMeetings = meetings.filter(m => 
    m.original_filename.toLowerCase().includes(search.toLowerCase()) || 
    m.summary?.toLowerCase().includes(search.toLowerCase()) ||
    m.meeting_id?.toString().includes(search) ||
    m.id?.toString().includes(search) ||
    m.transcript?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Meeting History</h1>
          <p className="text-slate-500 mt-1">Browse and search past meeting intelligences.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search meetings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition-colors"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 border-b border-red-200">
            {error}
          </div>
        )}
        {loading ? (
          <MeetingTable meetings={[]} loading={true} showActions={true} skeletonRows={6} />
        ) : filteredMeetings.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">No meetings found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-6">
              {search ? "We couldn't find any meetings matching your search." : "You haven't uploaded any meetings yet."}
            </p>
            {!search && (
              <Link 
                to="/upload"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Upload your first meeting
              </Link>
            )}
          </div>
        ) : (
          <MeetingTable 
            meetings={filteredMeetings} 
            loading={false} 
            showActions={true} 
            onDelete={handleDelete}
          />
        )}
        {!loading && filteredMeetings.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
            <span>Showing {filteredMeetings.length} result{filteredMeetings.length !== 1 && 's'}</span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-slate-200 rounded bg-white text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1 border border-slate-200 rounded bg-white text-slate-700 hover:bg-slate-50 transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
