import { User, Lock, Settings as SettingsIcon, Info } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences and application settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2 text-slate-800 font-medium">
            <User className="w-4 h-4 text-slate-500" />
            Profile
          </div>
          <div className="p-6 space-y-4 text-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-xl font-medium text-slate-500">
                JS
              </div>
              <div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md transition-colors">
                  Change Picture
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 mb-1.5 font-medium">Full Name</label>
                <input type="text" defaultValue="John Smith" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-slate-600 mb-1.5 font-medium">Email Address</label>
                <input type="email" defaultValue="john.smith@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-600 mb-1.5 font-medium">Phone Number</label>
                <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
              </div>
            </div>
            
            <div className="pt-2">
              <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium px-4 py-2 rounded-lg transition-colors text-sm">
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2 text-slate-800 font-medium">
            <Lock className="w-4 h-4 text-slate-500" />
            Security
          </div>
          <div className="p-6 space-y-4 text-sm">
            <div>
              <label className="block text-slate-600 mb-1.5 font-medium">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-slate-600 mb-1.5 font-medium">New Password</label>
              <input type="password" placeholder="Leave blank to keep current" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-slate-600 mb-1.5 font-medium">Confirm Password</label>
              <input type="password" placeholder="Confirm new password" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
            </div>
            <div className="pt-2">
              <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium px-4 py-2 rounded-lg transition-colors text-sm">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2 text-slate-800 font-medium">
            <SettingsIcon className="w-4 h-4 text-slate-500" />
            Preferences
          </div>
          <div className="p-6 space-y-4 text-sm">
            <div>
              <label className="block text-slate-600 mb-1.5 font-medium">Theme</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none">
                <option>System (Default)</option>
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 mb-1.5 font-medium">Language</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </div>

        {/* About Card */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2 text-slate-800 font-medium">
            <Info className="w-4 h-4 text-slate-500" />
            About
          </div>
          <div className="p-6 space-y-4 text-sm">
            <div className="mb-4">
              <p className="font-semibold text-slate-900">Enterprise AI Meeting Intelligence</p>
              <p className="text-slate-500 mt-1">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm text-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}
