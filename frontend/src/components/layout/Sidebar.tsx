import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  History, 
  Settings,
  Mic,
  Network
} from 'lucide-react';
import { cn } from '../../utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Upload', path: '/upload', icon: Upload },
  { name: 'History', path: '/history', icon: History },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm relative overflow-hidden shrink-0">
            <Mic className="w-4 h-4 text-white relative z-10" />
            <Network className="w-6 h-6 text-blue-400 absolute opacity-30 right-[-4px] bottom-[-4px]" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 tracking-tight text-sm leading-tight">Enterprise AI</span>
            <span className="text-[10px] text-slate-500 font-medium leading-tight tracking-wide uppercase">Meeting Intelligence</span>
          </div>
        </div>
      </div>
      <div className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium',
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                )
              }
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          );
        })}
      </div>
      
    </aside>
  );
}
