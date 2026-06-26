import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden selection:bg-blue-100">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-10 scroll-smooth">
          <div className="max-w-6xl mx-auto pb-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
