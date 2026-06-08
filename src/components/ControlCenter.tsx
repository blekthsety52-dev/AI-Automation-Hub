import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Terminal, 
  Clock, 
  PlusCircle, 
  Sparkles, 
  CheckCircle, 
  Zap, 
  Eye, 
  TrendingUp, 
  Smile, 
  MessageSquare,
  Video,
  ListTodo,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { TaskSchedule, LogMessage, Post } from '../types';

interface ControlCenterProps {
  tasks: TaskSchedule[];
  logs: LogMessage[];
  posts: Post[];
  onAddPost: (post: Omit<Post, 'id' | 'publishedAt' | 'reach' | 'reactions' | 'comments' | 'shares'>) => void;
  botStatus: 'running' | 'offline';
  onAddLog: (logMessage: Omit<LogMessage, 'id' | 'timestamp'>) => void;
  onUpdateTasks?: (taskIds: string[], action: 'start' | 'pause' | 'reset') => void;
}

export default function ControlCenter({ 
  tasks, 
  logs, 
  posts, 
  onAddPost, 
  botStatus, 
  onAddLog,
  onUpdateTasks
}: ControlCenterProps) {
  const [quickPostContent, setQuickPostContent] = useState('');
  const [quickPostNiche, setQuickPostNiche] = useState('AI & automation technology');
  const [quickPostType, setQuickPostType] = useState<'Text' | 'Image' | 'Video' | 'Reel'>('Text');
  
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleToggleTaskSelection = (taskId: string) => {
    setSelectedTaskIds(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId) 
        : [...prev, taskId]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedTaskIds.length === tasks.length) {
      setSelectedTaskIds([]);
    } else {
      setSelectedTaskIds(tasks.map(t => t.id));
    }
  };

  const handleBulkAction = (action: 'start' | 'pause' | 'reset') => {
    if (selectedTaskIds.length === 0) return;
    if (onUpdateTasks) {
      onUpdateTasks(selectedTaskIds, action);
    }
    setSelectedTaskIds([]);
  };

  // Handle Quick Publishing
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPostContent.trim()) return;

    onAddPost({
      content: quickPostContent,
      type: quickPostType,
      niche: quickPostNiche
    });

    onAddLog({
      task: 'ContentGenerator',
      level: 'SUCCESS',
      message: `Manually initiated quick publication of type [${quickPostType}] about "${quickPostNiche}"`
    });

    setQuickPostContent('');
    alert('Post published successfully to the Page Profile!');
  };

  // Prepare chart data from existing posts
  const performanceData = posts.slice(0, 7).reverse().map((post, index) => ({
    name: `Post ${index + 1}`,
    reach: post.reach,
    engagement: post.comments * 3 + post.shares * 5 + Object.values(post.reactions).reduce((a, b) => a + b, 0)
  }));

  // Prepare average execution times data for bottleneck bar chart analysis
  const taskPerformanceData = tasks.map(task => ({
    name: task.name,
    avgTime: task.averageExecutionTime,
  }));

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">
            Control Center
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time telemetry and process automation supervisor for the Llama3 loop.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <div>
              <div className="text-[10px] text-slate-400 font-mono leading-none">TOTAL REACH</div>
              <div className="text-sm font-semibold font-display text-slate-800 leading-none mt-1">
                {posts.reduce((sum, p) => sum + p.reach, 0).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            <div>
              <div className="text-[10px] text-slate-400 font-mono leading-none">TOTAL DISPATCHES</div>
              <div className="text-sm font-semibold font-display text-slate-800 leading-none mt-1">
                {logs.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8 Active Scheduled Tasks Blocks */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-indigo-600" />
              Scheduled Loop Jobs ({tasks.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Loop frequency matches .env config</p>
          </div>

          {/* Bulk Action Controls */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200/60 font-sans">
            <div className="flex items-center gap-2 px-2.5 border-r border-slate-200">
              <input
                type="checkbox"
                id="bulk-select-all"
                checked={selectedTaskIds.length === tasks.length && tasks.length > 0}
                onChange={handleToggleSelectAll}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="bulk-select-all" className="text-xs font-semibold text-slate-600 select-none cursor-pointer">
                Select All ({selectedTaskIds.length})
              </label>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleBulkAction('start')}
                disabled={selectedTaskIds.length === 0}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100/70 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                title="Start Selected Tasks"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Start</span>
              </button>
              <button
                onClick={() => handleBulkAction('pause')}
                disabled={selectedTaskIds.length === 0}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-100/70 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                title="Pause Selected Tasks"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </button>
              <button
                onClick={() => handleBulkAction('reset')}
                disabled={selectedTaskIds.length === 0}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100/70 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                title="Reset Selected Tasks"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              onClick={() => handleToggleTaskSelection(task.id)}
              className={`p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all cursor-pointer relative group select-none ${
                selectedTaskIds.includes(task.id)
                  ? 'border-indigo-500 bg-indigo-55/10 ring-1 ring-indigo-500/30 shadow-indigo-500/10'
                  : botStatus === 'offline' 
                  ? 'border-slate-100 opacity-60' 
                  : task.status === 'running' 
                  ? 'border-emerald-500/40 shadow-emerald-50/10' 
                  : task.status === 'success' 
                  ? 'border-indigo-500/20' 
                  : 'border-slate-150'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTaskIds.includes(task.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleToggleTaskSelection(task.id);
                    }}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="text-2xl">{task.icon}</span>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase tracking-wider ${
                  botStatus === 'offline'
                    ? 'bg-slate-100 text-slate-500'
                    : task.status === 'running'
                    ? 'bg-emerald-50 text-emerald-600 font-bold animate-pulse'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {botStatus === 'offline' ? 'stopped' : task.status}
                </span>
              </div>
              <h4 className="font-display font-semibold text-sm text-slate-800 leading-tight">
                {task.name}
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                {task.description}
              </p>
              
              <div className="border-t border-slate-100 mt-3 pt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.interval}
                </div>
                <span>Avg: {task.averageExecutionTime}ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Quick Publisher & Reach charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Quick Posting Form */}
        <div className="lg:col-span-4 bg-white/80 p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              Manual Post Dispatcher
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Simulate or manually publish content directly onto your AI Automation page profile.
            </p>

            <form onSubmit={handlePublish} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                  Content / Caption
                </label>
                <textarea
                  rows={4}
                  value={quickPostContent}
                  onChange={(e) => setQuickPostContent(e.target.value)}
                  placeholder="What value-packed, viral hook wants to go live today..."
                  className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                    Format Type
                  </label>
                  <select
                    value={quickPostType}
                    onChange={(e) => setQuickPostType(e.target.value as any)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none"
                  >
                    <option value="Text">📝 Text Post</option>
                    <option value="Image">🖼️ Image Link</option>
                    <option value="Video">🎥 Video Clip</option>
                    <option value="Reel">🎬 Reel Video</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                    Niche Tag
                  </label>
                  <select
                    value={quickPostNiche}
                    onChange={(e) => setQuickPostNiche(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none"
                  >
                    <option value="AI & automation technology">🤖 AI/Automation</option>
                    <option value="Productivity Hacks">⚡ Productivity</option>
                    <option value="No-Code Tech Workflows">🔧 No-Code/Make</option>
                    <option value="Davao tech branding">🌾 Davao Tech</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={!quickPostContent.trim()}
                className="w-full cursor-pointer py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl font-medium text-xs shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/25 transition-all text-center flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusCircle className="w-4 h-4" />
                Publish Live to Feed
              </button>
            </form>
          </div>
        </div>

        {/* Charts & Analytics */}
        <div className="lg:col-span-8 bg-white/80 p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Page Analytics History
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Track of simulated posts, interactions, organic reach, and social multipliers.
            </p>

            <div className="w-full h-56 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                  />
                  <Line type="monotone" dataKey="reach" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Reach" />
                  <Line type="monotone" dataKey="engagement" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="Engage" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Bottlenecks / Execution Time Monitor */}
      <div className="bg-white/80 p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
        <div className="flex justify-between items-start sm:items-center">
          <div>
            <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-indigo-500" />
              Task Execution Times & Bottleneck Analysis
            </h3>
            <p className="text-xs text-slate-500">
              Compare average execution times (ms) to detect thread locks or high latency loops. Items exceeding 2,500ms are flagged as warning, and those exceeding 3,500ms are critical.
            </p>
          </div>
          <div className="flex gap-4 text-xs font-mono select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-blue-500"></span>
              <span>Optimal (&lt;2.5s)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>
              <span>Warning (&gt;2.5s)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-rose-500"></span>
              <span>Critical (&gt;3.5s)</span>
            </div>
          </div>
        </div>

        <div className="w-full h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={taskPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit="ms" />
              <Tooltip
                contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
              />
              <Bar dataKey="avgTime" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Average Time">
                {taskPerformanceData.map((entry, index) => {
                  const color = entry.avgTime > 3500 ? '#ef4444' : entry.avgTime > 2500 ? '#f59e0b' : '#3b82f6';
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cyberpunk Live Terminal Logger */}
      <div className="bg-[#0b0f19] text-emerald-400 p-6 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Terminal Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4 select-none">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
              Live Console Output (Llama3 Loop)
            </span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/20 border border-rose-500 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500 inline-block"></span>
          </div>
        </div>

        {/* Console logs */}
        <div className="font-mono text-xs space-y-1.5 max-h-56 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {logs.map((log) => {
            let levelColor = 'text-emerald-400';
            if (log.level === 'WARN') levelColor = 'text-amber-400';
            if (log.level === 'ERROR') levelColor = 'text-rose-500 font-bold';
            
            return (
              <div key={log.id} className="transition-all hover:bg-slate-900/50 py-0.5 rounded px-1 flex gap-2">
                <span className="text-slate-500 select-none">[{log.timestamp}]</span>
                <span className={`font-semibold ${levelColor}`}>[{log.level}]</span>
                <span className="text-cyan-400 font-bold">[{log.task}]</span>
                <span className="text-slate-300">{log.message}</span>
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}
