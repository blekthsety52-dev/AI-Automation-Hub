import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ControlCenter from './components/ControlCenter';
import VoiceTasker from './components/VoiceTasker';
import CanvaCatalogue from './components/CanvaCatalogue';
import PageProfile from './components/PageProfile';
import SettingsPanel from './components/SettingsPanel';
import GeminiIntelligence from './components/GeminiIntelligence';
import MarketingStudio from './components/MarketingStudio';
import { TaskSchedule, LogMessage, Post, PageProfileData } from './types';

// Raw Initial Data configuration matching user's real state history
const INITIAL_TASKS: TaskSchedule[] = [
  { id: '1', name: 'Content Generator', icon: '📝', description: 'Creates & drafts value-packed posts inside the queue.', interval: 'Every 10 min', status: 'success', lastRun: '9m ago', nextRun: '1m ago', averageExecutionTime: 2450 },
  { id: '2', name: 'Comment Moderator', icon: '🛡️', description: 'AI sentiment checks, auto-replies, and spam filter.', interval: 'Every 60s', status: 'sleeping', lastRun: '44s ago', nextRun: '16s ago', averageExecutionTime: 1120 },
  { id: '3', name: 'Messenger DM Bot', icon: '💬', description: 'Autonomously manages client FAQ and qualifications.', interval: 'Every 30s', status: 'sleeping', lastRun: '12s ago', nextRun: '18s ago', averageExecutionTime: 950 },
  { id: '4', name: 'Analytics Tracker', icon: '📊', description: 'Tracks posts engagement, reviews reach indexes.', interval: 'Every 1 hr', status: 'idle', lastRun: '32m ago', nextRun: '28m ago', averageExecutionTime: 3100 },
  { id: '5', name: 'State Persistence', icon: '💾', description: 'Stores local file configurations dynamically.', interval: 'Every 5 min', status: 'idle', lastRun: '3m ago', nextRun: '2m ago', averageExecutionTime: 420 },
  { id: '6', name: 'Live Dashboard Screen', icon: '📋', description: 'Maintains CLI console logging state metrics.', interval: 'Always active', status: 'success', lastRun: 'Just now', nextRun: 'Immediate', averageExecutionTime: 15 },
  { id: '7', name: 'Daily Report', icon: '📄', description: 'Publishes summary metrics to the administrator.', interval: 'Once per day', status: 'idle', lastRun: '18hr ago', nextRun: '6hr ago', averageExecutionTime: 1820 },
  { id: '8', name: 'Group Video Gen', icon: '🎬', description: 'Auto-posts video ideas with Seedance templates.', interval: '3x per day', status: 'running', lastRun: 'Just now', nextRun: '8hr ago', averageExecutionTime: 4120 },
];

const INITIAL_LOGS: LogMessage[] = [
  { id: '101', timestamp: '16:00:23', task: 'System', level: 'INFO', message: 'Pre-flight check: evaluating active environment. Sync OK.' },
  { id: '102', timestamp: '16:01:05', task: 'Ollama', level: 'SUCCESS', message: 'Ollama endpoint responding at http://localhost:11434. llama3 loaded successfully.' },
  { id: '103', timestamp: '16:02:11', task: 'FacebookAPI', level: 'INFO', message: 'Querying node accounts to retrieve access permissions...' },
  { id: '104', timestamp: '16:02:44', task: 'FacebookAPI', level: 'SUCCESS', message: 'Token authenticated. AI Automation Page connected successfully (ID: 1186562841198858)' },
  { id: '105', timestamp: '16:04:12', task: 'ContentGenerator', level: 'INFO', message: 'Initiated background post generator. Checking template queue...' },
  { id: '106', timestamp: '16:12:15', task: 'CommentModerator', level: 'WARN', message: 'Comment moderation check warning: 400 Bad Request on Pages inbox thread. pages_messaging scope missing.' },
  { id: '107', timestamp: '16:15:33', task: 'FacebookAPI', level: 'SUCCESS', message: 'Refreshed Page Access Token with verified scopes.' },
  { id: '108', timestamp: '16:22:20', task: 'AnalyticsTracker', level: 'INFO', message: 'Starting engagement score tracking. Found 14 active published posts.' },
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    content: "📢 I designed an AI Task Generator app for productivity teams.\n\nWhat it does:\n🎵 Voice memo → AI extracts your tasks\n🎯 Auto-prioritizes (High / Medium / Low)\n📅 Auto-schedules calendar blocks at 9:00 AM\n\nworks 100% offline. No data leaves your device. Designed for Davao tech teams.",
    type: 'Image',
    imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    publishedAt: 'Today, 5:44 PM',
    reach: 420,
    reactions: { like: 12, love: 5, celebrate: 2 },
    comments: 4,
    shares: 2,
    niche: 'AI & automation technology',
    canvaTemplateUrl: 'https://ai-developer-pro.my.canva.site/ai-task-list-generator-html'
  },
  {
    id: 'post-2',
    content: "Hot Take: In 2027, you won't login to 10 different SaaS portals.\n\nYou'll just talk to one lightweight local AI model (using Ollama/Llama3) that manages your files, coordinates with clients, and books your agenda.\n\nAgree or disagree? Double tap if you think local AI is the future.",
    type: 'Text',
    publishedAt: 'Today, 4:45 PM',
    reach: 320,
    reactions: { like: 24, love: 8},
    comments: 11,
    shares: 3,
    niche: 'AI & automation technology'
  },
  {
    id: 'post-3',
    content: "Quick Tip: 3 steps to automate your design feedback loop using Canva\n\n1. Feed Meta catalog data into active variables\n2. Bulk-generate variants for products in seconds\n3. Click Sync to publish in Business Suite.\n\nSaved this for later if you want to speed up design workflows! 🚀",
    type: 'Text',
    publishedAt: 'Today, 4:12 PM',
    reach: 180,
    reactions: { like: 8, insight: 4 },
    comments: 2,
    shares: 5,
    niche: 'Productivity Hacks'
  },
  {
    id: 'post-4',
    content: "🤖 Welcome to AI Automation!\n\nWe're here to explore how artificial intelligence is transforming the way we work, create, and connect.\n\nWhether you're a developer, entrepreneur, or just AI-curious — follow us for daily insights. The future is automated.",
    type: 'Text',
    publishedAt: 'Today, 4:10 PM',
    reach: 220,
    reactions: { like: 15, love: 9 },
    comments: 3,
    shares: 1,
    niche: 'AI & automation technology'
  }
];

const INITIAL_PROFILE: PageProfileData = {
  name: "AI Automation",
  category: "Internet company",
  bio: "Exploring the future of AI automation, tools, and workflows to boost productivity and simplify your digital life.",
  phone: "+63 (082) 299-8800 (Davao)",
  email: "contact@aiautomation.com",
  website: "https://ai-developer-pro.my.canva.site/ai-task-list-generator-html",
  location: "Davao City, 8000, Philippines",
  followers: 1240,
  pageId: "1186562841198858",
  coverPhoto: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
  profilePic: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80"
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [botStatus, setBotStatus] = useState<'running' | 'offline'>('running');
  
  const [tasks, setTasks] = useState<TaskSchedule[]>(INITIAL_TASKS);
  const [logs, setLogs] = useState<LogMessage[]>(INITIAL_LOGS);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [profile, setProfile] = useState<PageProfileData>(INITIAL_PROFILE);

  // Periodic log generator to simulate real-time loop execution
  useEffect(() => {
    if (botStatus !== 'running') return;

    const interval = setInterval(() => {
      // Pick random task to simulated-execute
      const activeTasks = tasks.filter(t => t.id !== '7'); // exclude Daily Report
      const randomTask = activeTasks[Math.floor(Math.random() * activeTasks.length)];
      
      // Update task status visually to running for 1 second, then success
      setTasks(prev => prev.map(t => {
        if (t.id === randomTask.id) {
          return { ...t, status: 'running' };
        }
        return t;
      }));

      setTimeout(() => {
        setTasks(prev => prev.map(t => {
          if (t.id === randomTask.id) {
            return { 
              ...t, 
              status: randomTask.id === '2' || randomTask.id === '3' ? 'sleeping' : 'success',
              lastRun: 'Just now'
            };
          }
          return t;
        }));
      }, 1000);

      // Generate actual log text
      const mockPhrases = [
        "Scanning recent inbox conversions... all queries addressed.",
        "Parsing comments of square promotion... no negative flags detected.",
        "Optimizing local prompt heuristics. Feed context synchronized.",
        "Sustaining state file cache save index is verified.",
        "Generating new AI tech value post content using Llama3...",
        "Evaluating Davao area tech group multipliers. Score is optimal."
      ];

      const logWords = [
        { task: 'System', text: 'State index persistence synced with disk buffer.' },
        { task: 'CommentModerator', text: 'Checked recent square promo post - sentiment check passed successfully.' },
        { task: 'MessengerBot', text: 'Identified 1 active incoming conversation. Auto-replied with FAQ template.' },
        { task: 'ContentGenerator', text: 'Successfully checked post schedule queue - next event scheduled for 02:00 PM.' },
        { task: 'AnalyticsTracker', text: 'Organic reach metrics recalculated. Overall page index improved.' },
      ];

      const chosenPhrase = logWords[Math.floor(Math.random() * logWords.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

      // Insert new log line
      const newLog: LogMessage = {
        id: Math.random().toString(),
        timestamp: timeStr,
        task: chosenPhrase.task as any,
        level: 'INFO',
        message: chosenPhrase.text
      };

      setLogs(prev => {
        const next = [...prev, newLog];
        if (next.length > 50) next.shift(); // truncate logs at 50
        return next;
      });

    }, 5000);

    return () => clearInterval(interval);
  }, [botStatus, tasks]);

  // Insert manual log
  const handleAddLog = (task: 'System' | 'Ollama' | 'FacebookAPI', level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR', message: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    setLogs(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        timestamp: timeStr,
        task,
        level,
        message
      }
    ]);
  };

  // Add post from Quick posting or Canva
  const handleAddNewPost = (newPostData: Omit<Post, 'id' | 'publishedAt' | 'reach' | 'reactions' | 'comments' | 'shares'>) => {
    const freshPost: Post = {
      ...newPostData,
      id: Math.random().toString(),
      publishedAt: 'Just now',
      reach: 120, // baseline organic reach
      reactions: { like: 1 },
      comments: 0,
      shares: 0
    };

    setPosts([freshPost, ...posts]);
  };

  // Toggle Bot loop active/inactive
  const handleToggleBot = () => {
    setBotStatus(prev => {
      const next = prev === 'running' ? 'offline' : 'running';
      handleAddLog('System', next === 'running' ? 'SUCCESS' : 'WARN', next === 'running' ? 'Re-activated active background loops.' : 'Active background loops paused.');
      return next;
    });
  };

  const handleUpdatePostStats = (id: string, action: 'like' | 'share' | 'comment') => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        if (action === 'like') {
          return {
            ...post,
            reactions: {
              ...post.reactions,
              like: (post.reactions.like || 0) + 1
            },
            reach: post.reach + 15
          };
        } else if (action === 'share') {
          return {
            ...post,
            shares: post.shares + 1,
            reach: post.reach + 45
          };
        } else {
          return {
            ...post,
            comments: post.comments + 1,
            reach: post.reach + 25
          };
        }
      }
      return post;
    }));
  };

  const handleUpdateTasks = (taskIds: string[], action: 'start' | 'pause' | 'reset') => {
    setTasks(prev => prev.map(task => {
      if (taskIds.includes(task.id)) {
        let nextStatus = task.status;
        let lastRun = task.lastRun;
        let nextRun = task.nextRun;
        let averageExecutionTime = task.averageExecutionTime;

        if (action === 'start') {
          nextStatus = 'running';
          lastRun = 'Just now';
        } else if (action === 'pause') {
          nextStatus = 'idle';
        } else if (action === 'reset') {
          nextStatus = 'idle';
          lastRun = 'Never';
          nextRun = 'Immediate';
          averageExecutionTime = 0;
        }

        return {
          ...task,
          status: nextStatus as any,
          lastRun,
          nextRun,
          averageExecutionTime
        };
      }
      return task;
    }));

    // Add a log entry for the action
    const affectedTaskNames = tasks
      .filter(t => taskIds.includes(t.id))
      .map(t => t.name)
      .join(', ');

    let logMessage = '';
    let level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR' = 'INFO';
    if (action === 'start') {
      logMessage = `Bulk started tasks [${affectedTaskNames}]`;
      level = 'SUCCESS';
    } else if (action === 'pause') {
      logMessage = `Bulk paused tasks [${affectedTaskNames}]`;
      level = 'WARN';
    } else if (action === 'reset') {
      logMessage = `Bulk reset stats for tasks [${affectedTaskNames}]`;
      level = 'INFO';
    }

    handleAddLog('System', level, logMessage);
  };

  const handleUpdateProfile = (newData: Partial<PageProfileData>) => {
    setProfile(prev => ({ ...prev, ...newData }));
  };

  return (
    <div className="flex h-screen bg-[#f0f6ff] overflow-hidden font-sans antialiased text-slate-800">
      
      {/* Dynamic Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        botStatus={botStatus}
        onToggleBot={handleToggleBot}
        tasksCount={tasks.length}
      />

      {/* Primary tab views content area */}
      <div className="flex-1 h-full overflow-hidden flex flex-col bg-slate-50/50">
        
        {/* Render Active View tab */}
        {activeTab === 'dashboard' && (
          <ControlCenter 
            tasks={tasks}
            logs={logs}
            posts={posts}
            onAddPost={handleAddNewPost}
            botStatus={botStatus}
            onAddLog={handleAddLog as any}
            onUpdateTasks={handleUpdateTasks}
          />
        )}

        {activeTab === 'voice-tasker' && (
          <VoiceTasker 
            onAddLog={handleAddLog as any}
          />
        )}

        {activeTab === 'canva-catalogue' && (
          <CanvaCatalogue 
            onAddLog={handleAddLog as any}
          />
        )}

        {activeTab === 'gemini-intelligence' && (
          <GeminiIntelligence 
            onAddPost={handleAddNewPost}
            onAddLog={handleAddLog as any}
          />
        )}

        {activeTab === 'marketing-studio' && (
          <MarketingStudio 
            onAddPost={handleAddNewPost}
            onAddLog={handleAddLog as any}
            onBoostFollowers={(amount) => {
              handleUpdateProfile({ followers: profile.followers + amount });
            }}
          />
        )}

        {activeTab === 'page-profile' && (
          <PageProfile 
            posts={posts}
            profile={profile}
            onUpdatePostStats={handleUpdatePostStats}
            onAddLog={handleAddLog as any}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsPanel 
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onAddLog={handleAddLog as any}
          />
        )}

      </div>
    </div>
  );
}
