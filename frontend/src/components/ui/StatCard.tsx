import { LucideIcon } from 'lucide-react';
import { Skeleton } from './Skeleton';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  colorClass: string;
  iconBg: string;
  loading?: boolean;
}

export function StatCard({ title, value, icon: Icon, colorClass, iconBg, loading }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow group cursor-default">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <div className="text-3xl font-bold text-slate-900">
          {loading ? <Skeleton className="h-9 w-16 mt-1" /> : value}
        </div>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} ${colorClass} group-hover:scale-105 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
