import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMeetings } from '../api';
import { Meeting } from '../types';
import { 
  Video, 
  CheckCircle2, 
  Mail, 
  ArrowRight,
  ListTodo
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { MeetingTable } from '../components/ui/MeetingTable';

export function Dashboard() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    actionItems: 0,
    emails: 0,
    pendingTasks: 0
  });

  const [greeting, setGreeting] = useState({ text: 'Good Morning ☀️', subText: "Here is today's meeting intelligence." });

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting({ text: 'Good Morning ☀️', subText: "Here is today's meeting intelligence." });
      } else if (hour >= 12 && hour < 17) {
        setGreeting({ text: 'Good Afternoon 🌤️', subText: "Ready to analyze your meetings today?" });
      } else if (hour >= 17 && hour < 21) {
        setGreeting({ text: 'Good Evening 🌇', subText: "Here is your meeting summary for the day." });
      } else {
        setGreeting({ text: 'Welcome Back 🌙', subText: "Catching up on some late-night meeting intelligence?" });
      }
    };
    
    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getMeetings();
        setMeetings(data);
        
        let actionItemsCount = 0;
        data.forEach(m => {
          actionItemsCount += m.action_items?.length || 0;
        });

        setStats({
          total: data.length,
          actionItems: actionItemsCount,
          emails: data.filter(m => m.email).length,
          pendingTasks: actionItemsCount // Real data: total action items = pending tasks
        });
      } catch (err) {
        console.error("Failed to load meetings", err);
        setError("Failed to load dashboard data. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div key={greeting.text} className="animate-in fade-in duration-700 slide-in-from-bottom-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{greeting.text}</h1>
        <p className="text-slate-500 mt-1">{greeting.subText}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {error && (
          <div className="col-span-full p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 mb-4">
            {error}
          </div>
        )}
        <StatCard 
          title="Total Meetings" 
          value={stats.total} 
          icon={Video} 
          colorClass="text-blue-600"
          iconBg="bg-blue-50"
          loading={loading}
        />
        <StatCard 
          title="Action Items" 
          value={stats.actionItems} 
          icon={CheckCircle2} 
          colorClass="text-green-600"
          iconBg="bg-green-50"
          loading={loading}
        />
        <StatCard 
          title="Emails Generated" 
          value={stats.emails} 
          icon={Mail} 
          colorClass="text-purple-600"
          iconBg="bg-purple-50"
          loading={loading}
        />
        <StatCard 
          title="Pending Tasks" 
          value={stats.pendingTasks} 
          icon={ListTodo} 
          colorClass="text-amber-500"
          iconBg="bg-amber-50"
          loading={loading}
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            Recent Meetings
          </div>
          <Link to="/history" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {loading ? (
          <MeetingTable meetings={[]} loading={true} skeletonRows={5} />
        ) : meetings.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No meetings found. Upload your first recording to get started.
          </div>
        ) : (
          <MeetingTable meetings={meetings.slice(0, 5)} loading={false} />
        )}
      </div>
    </div>
  );
}
