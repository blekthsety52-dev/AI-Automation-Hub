import React from 'react';
import { 
  LayoutDashboard, 
  Mic, 
  Sparkles, 
  Facebook, 
  Settings, 
  Bot, 
  Play, 
  AlertTriangle,
  Brain,
  Megaphone
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  botStatus: 'running' | 'offline';
  onToggleBot: () => void;
  tasksCount: number;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  botStatus, 
  onToggleBot, 
  tasksCount 
}: SidebarProps) {
  const tabs = [
    { id: 'dashboard', label: 'Control Center', icon: LayoutDashboard },
    { id: 'voice-tasker', label: 'Voice Tasker', icon: Mic },
    { id: 'canva-catalogue', label: 'Canva Catalogue', icon: Sparkles },
    { id: 'gemini-intelligence', label: 'Gemini AI', icon: Brain },
    { id: 'marketing-studio', label: 'Reels & Ads Studio', icon: Megaphone },
    { id: 'page-profile', label: 'Page Profile', icon: Facebook },
    { id: 'settings', label: 'Configuration', icon: Settings },
  ];

  return (
    <div className="w-80 h-full flex flex-col glass-panel border-r border-[#94b4ff]/25 p-6 select-none bg-white/70">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display font-semibold text-lg tracking-tight text-slate-800">
            AI Automation Hub
          </h1>
          <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
            Control Room v2.0
          </span>
        </div>
      </div>

      {/* Bot Live Process Status Widget */}
      <div className="p-4 rounded-xl mb-6 bg-slate-900 text-white shadow-md shadow-slate-900/10 transition-all border border-white/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`relative flex h-2 w-2`}>
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${botStatus === 'running' ? 'bg-emerald-400' : 'bg-rose-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${botStatus === 'running' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
            </span>
            <span className="text-xs uppercase font-mono tracking-wider font-medium text-slate-300">
              Bot Status
            </span>
          </div>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-400">
            Windows Loop
          </span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-display font-bold tracking-tight">
              {botStatus === 'running' ? 'Active' : 'Offline'}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              {botStatus === 'running' 
                ? `${tasksCount} active background loops`
                : 'Run system script to start'
              }
            </p>
          </div>
          <button
            onClick={onToggleBot}
            className={`cursor-pointer px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-sans font-medium text-xs shadow-md transition-all ${
              botStatus === 'running'
                ? 'bg-rose-500/20 hover:bg-rose-500/35 text-rose-300 hover:text-rose-200'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            <Play className={`w-3 h-3 ${botStatus === 'running' ? 'fill-transparent text-rose-300' : 'fill-white'}`} />
            {botStatus === 'running' ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 space-y-1">
        <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase block mb-3 px-2">
          Control Panel
        </span>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-700 shadow-sm border-l-4 border-indigo-600 pl-3 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-l-4 border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Connection warning or tips */}
      <div className="pt-4 border-t border-slate-200/60">
        <div className="flex gap-2.5 bg-amber-500/5 border border-amber-500/20 p-3 rounded-xl">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-[11px] text-slate-600 leading-normal">
            <span className="font-semibold text-slate-800">Token Warning</span>
            <p className="mt-0.5">Your Page Access Token is active but temporary. Re-auth if API returns 190 Exception.</p>
          </div>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-4 leading-none">
          AI Automation Hub © 2026
        </p>
      </div>
    </div>
  );
}
