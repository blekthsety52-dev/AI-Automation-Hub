import React, { useState } from 'react';
import { 
  Play, 
  Trash2, 
  Check, 
  Share2, 
  Download, 
  Calendar as CalendarIcon, 
  AlertCircle, 
  Volume2, 
  ArrowRight,
  TrendingDown,
  Clock,
  Bell,
  CheckCircle,
  Clock3,
  Zap,
  PlusCircle
} from 'lucide-react';
import { VoiceTask } from '../types';

interface VoiceTaskerProps {
  onAddLog: (task: 'System' | 'Ollama' | 'FacebookAPI', level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR', message: string) => void;
}

const PRESET_MEMOS = [
  {
    title: "1. Work-from-Home Routine Draft",
    text: "Hey reminder to review the Canva catalog template design at 2 PM, then prepare the group engagement templates, and finally check the Facebook page analytics in the evening around 5 PM."
  },
  {
    title: "2. Morning Syncup Outline",
    text: "Review the Llama3 .env variables at 9 AM, generate some viral hooks at 10 AM, and align with davao design teams around 11:30 AM to finalize the holographic cover design."
  },
  {
    title: "3. Technical Quick Audit",
    text: "Test if the Ollama local connection works at 1 PM, troubleshoot the 400 Bad Request error by requesting permissions pages_messaging, and then refresh the Page Access Token."
  }
];

export default function VoiceTasker({ onAddLog }: VoiceTaskerProps) {
  const [memoText, setMemoText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<number>(0);
  const [extractedTasks, setExtractedTasks] = useState<VoiceTask[]>([]);
  const [calendarSlots, setCalendarSlots] = useState<Record<string, VoiceTask>>({});

  const timelineHours = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  // AI Task Extraction simulation
  const handleProcessMemo = (text: string) => {
    if (!text.trim()) return;
    setIsProcessing(true);
    setProcessingStep(1); // Transcribing

    onAddLog('Ollama', 'INFO', 'Initializing voice transcription model...');

    setTimeout(() => {
      setProcessingStep(2); // Extracting tasks
      onAddLog('Ollama', 'INFO', 'Analyzing transcript with Llama3 context. Identifying tasks, priorities, and time references...');
    }, 1500);

    setTimeout(() => {
      setProcessingStep(3); // Auto-scheduling
      onAddLog('Ollama', 'SUCCESS', 'Extracted 3 prioritized tasks with scheduled time tags.');
      
      // Perform extraction
      const lower = text.toLowerCase();
      const mockTasks: VoiceTask[] = [];

      // Check keywords and create mock assignments
      if (lower.includes('canva') || lower.includes('catalog') || lower.includes('template')) {
        mockTasks.push({
          id: 'task-1',
          title: 'Review Canva Catalog Designs',
          description: 'Inspect the newly generated holographic Brain visual template.',
          duration: 45,
          priority: 'High',
          alarmMinutesBefore: 15,
          timeSlot: '02:00 PM'
        });
      }
      if (lower.includes('engagement') || lower.includes('recipe')) {
        mockTasks.push({
          id: 'task-2',
          title: 'Draft Group Engagement Recipes',
          description: 'Copy and personalize the 6 ready-to-paste comment templates.',
          duration: 30,
          priority: 'Medium',
          alarmMinutesBefore: 30,
          timeSlot: '11:00 AM'
        });
      }
      if (lower.includes('analytics') || lower.includes('insights') || lower.includes('report')) {
        mockTasks.push({
          id: 'task-3',
          title: 'Audit Facebook Page Analytics',
          description: 'Check audience reactions, engagement reach index, and viral multipliers.',
          duration: 30,
          priority: 'Low',
          alarmMinutesBefore: 0,
          timeSlot: '05:00 PM'
        });
      }

      // Default mock fallback if no preset keywords matched
      if (mockTasks.length === 0) {
        mockTasks.push(
          {
            id: 'task-10',
            title: 'Verify Local Ollama Server Connection',
            description: 'Execute Llama3 pre-flight check in terminal.',
            duration: 15,
            priority: 'High',
            alarmMinutesBefore: 15,
            timeSlot: '09:00 AM'
          },
          {
            id: 'task-11',
            title: 'Refactor Facebook Page Access Token',
            description: 'Request pages_messaging and read_insights in Graph Explorer.',
            duration: 30,
            priority: 'Medium',
            alarmMinutesBefore: 30,
            timeSlot: '10:00 AM'
          },
          {
            id: 'task-12',
            title: 'Davao Design Alignment',
            description: 'Finalize branding theme with Davao local design groups.',
            duration: 45,
            priority: 'Low',
            alarmMinutesBefore: 0,
            timeSlot: '03:00 PM'
          }
        );
      }

      setExtractedTasks(mockTasks);

      // Auto slot inside calendar
      const nextSlots: Record<string, VoiceTask> = {};
      mockTasks.forEach(task => {
        if (task.timeSlot) {
          nextSlots[task.timeSlot] = task;
        }
      });
      setCalendarSlots(nextSlots);

      setIsProcessing(false);
      setProcessingStep(0);
    }, 3200);
  };

  // Add task to a specific slot
  const handleAssignSlot = (task: VoiceTask, slot: string) => {
    const updatedTask = { ...task, timeSlot: slot };
    
    // Remove old slot assignment
    const nextSlots = { ...calendarSlots };
    Object.keys(nextSlots).forEach(key => {
      if (nextSlots[key].id === task.id) {
        delete nextSlots[key];
      }
    });

    nextSlots[slot] = updatedTask;
    setCalendarSlots(nextSlots);

    // Update tasks list
    setExtractedTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
    
    onAddLog('System', 'SUCCESS', `Re-allocated task "${task.title}" to ${slot}`);
  };

  const handleClearAll = () => {
    setMemoText('');
    setExtractedTasks([]);
    setCalendarSlots({});
  };

  // Mock download trigger
  const triggerExport = (type: 'csv' | 'ics') => {
    onAddLog('System', 'SUCCESS', `Triggered local download of task list as format .${type}`);
    alert(`Successfully generated tasks.${type}! Simulated download completed.`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-7xl mx-auto">
      {/* Module Header */}
      <div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">
          Voice Tasker
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Transcribe messy natural voice thoughts and automagically map them to an interactive daily schedule grid.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Voice Input & Extracted list */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Glassmorphism Transcription Widget */}
          <div className="glass-panel p-6 rounded-2xl border border-[#94b4ff]/25 space-y-4">
            <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-indigo-600" />
              1. Input Voice Memo / Thoughts
            </h3>

            {/* Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 font-semibold block mb-1">
                TAP PRESET MEMO TO SIMULATE VOICE TRANSCRIPT:
              </span>
              <div className="grid grid-cols-1 gap-1.5ClassName">
                {PRESET_MEMOS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setMemoText(preset.text);
                      onAddLog('System', 'INFO', `Loaded preset memo template #${index + 1}`);
                    }}
                    className="cursor-pointer text-left w-full p-2.5 rounded-lg text-xs border border-indigo-100 bg-indigo-50/20 text-indigo-800 hover:bg-indigo-50/50 transition-all font-medium flex items-center justify-between"
                  >
                    <span>{preset.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea for note text */}
            <div className="pt-2">
              <textarea
                rows={4}
                value={memoText}
                onChange={(e) => setMemoText(e.target.value)}
                placeholder="Type your messy voice thoughts here or click a preset above..."
                className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              />
            </div>

            {/* Transcription Progress Pipeline */}
            {isProcessing && (
              <div className="p-3 bg-indigo-50/40 rounded-xl border border-indigo-100/50 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-indigo-700">
                  <span className="font-bold flex items-center gap-1.5 animate-pulse">
                    <Zap className="w-3 h-3 text-indigo-500" />
                    {processingStep === 1 ? 'Transcribing Audio...' : processingStep === 2 ? 'Llama3 Extracting Tasks...' : 'Syncing Calendars...'}
                  </span>
                  <span>{processingStep * 33}%</span>
                </div>
                <div className="w-full h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-400 to-indigo-600 transition-all duration-500" 
                    style={{ width: `${processingStep * 33}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2.5">
              <button
                disabled={!memoText.trim() || isProcessing}
                onClick={() => handleProcessMemo(memoText)}
                className="cursor-pointer flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-xs shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/25 transition-all text-center flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusCircle className="w-4 h-4" />
                Analyze & Extract
              </button>
              <button
                onClick={handleClearAll}
                className="cursor-pointer p-2.5 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List of generated tasks */}
          {extractedTasks.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600" />
                2. Extracted Priority Tasks
              </h3>
              <p className="text-xs text-slate-500">
                Click time slot dropdown on any task card to arrange on the calendar timeline.
              </p>

              <div className="space-y-3">
                {extractedTasks.map((task) => {
                  let badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                  if (task.priority === 'High') badgeBg = 'bg-rose-50 text-rose-700 border-rose-200';
                  if (task.priority === 'Medium') badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';

                  return (
                    <div key={task.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col space-y-2.5">
                      <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                          <span className={`text-[9px] px-2 py-0.5 border rounded-full font-mono uppercase tracking-wider ${badgeBg}`}>
                            {task.priority} Priority
                          </span>
                          <h4 className="font-display font-semibold text-sm text-slate-800 mt-1">
                            {task.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 leading-normal">
                        {task.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 pt-1.5 border-t border-slate-100/50">
                        <span className="flex items-center gap-1">
                          <Clock3 className="w-3 h-3 text-slate-400" />
                          {task.duration} mins
                        </span>
                        
                        <div className="flex items-center gap-2.5">
                          {task.alarmMinutesBefore > 0 && (
                            <span className="flex items-center gap-1 text-slate-500">
                              <Bell className="w-3 h-3 text-indigo-400" />
                              Alarm -{task.alarmMinutesBefore}m
                            </span>
                          )}

                          {/* Time slot assignment picker */}
                          <select
                            value={task.timeSlot || ''}
                            onChange={(e) => handleAssignSlot(task, e.target.value)}
                            className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                          >
                            <option value="">-- No slot --</option>
                            {timelineHours.map(hour => (
                              <option key={hour} value={hour}>{hour}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Daily schedule/calendar timeline view */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-indigo-600" />
                3. Interactive Action Timeline
              </h3>
              {extractedTasks.length > 0 && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => triggerExport('ics')}
                    className="cursor-pointer px-2.5 py-1 text-xs border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 font-medium flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Export .ICS
                  </button>
                  <button 
                    onClick={() => triggerExport('csv')}
                    className="cursor-pointer px-2.5 py-1 text-xs border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 font-medium flex items-center gap-1"
                  >
                    <Share2 className="w-3 h-3" />
                    CSV Table
                  </button>
                </div>
              )}
            </div>

            {/* List timeline grid */}
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {timelineHours.map((hour) => {
                const assignedTask = calendarSlots[hour];
                
                let slotColor = 'border-slate-100 hover:border-slate-200 bg-white';
                let indicatorColor = 'bg-slate-200';
                
                if (assignedTask) {
                  if (assignedTask.priority === 'High') {
                    slotColor = 'border-rose-300 bg-rose-50/15';
                    indicatorColor = 'bg-rose-500';
                  } else if (assignedTask.priority === 'Medium') {
                    slotColor = 'border-amber-300 bg-amber-50/15';
                    indicatorColor = 'bg-amber-500';
                  } else {
                    slotColor = 'border-emerald-300 bg-emerald-50/15';
                    indicatorColor = 'bg-emerald-500';
                  }
                }

                return (
                  <div 
                    key={hour} 
                    className={`flex items-start gap-4 p-3 rounded-xl border transition-all ${slotColor}`}
                  >
                    {/* Hour side label */}
                    <div className="w-16 text-xs font-mono font-medium text-slate-400 pt-0.5 text-right select-none">
                      {hour}
                    </div>

                    {/* Timeline bullet line indicator */}
                    <div className="pt-1.5 relative h-full">
                      <span className={`w-2.5 h-2.5 rounded-full block ${indicatorColor}`}></span>
                    </div>

                    {/* Task block detail */}
                    <div className="flex-1">
                      {assignedTask ? (
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <h4 className="font-display font-semibold text-sm text-slate-800 leading-none">
                              {assignedTask.title}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-400">
                              🕒 {assignedTask.duration} mins
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-normal">
                            {assignedTask.description}
                          </p>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-350 italic font-sans py-0.5 select-none">
                          Empty slot — tap time dropdown on a priority card to assign.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
