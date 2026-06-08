import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Mail, 
  Globe, 
  Phone, 
  Calendar as CalendarIcon, 
  Award, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  ExternalLink,
  ChevronRight,
  Info,
  Facebook
} from 'lucide-react';
import { Post, PageProfileData } from '../types';

interface PageProfileProps {
  posts: Post[];
  profile: PageProfileData;
  onUpdatePostStats: (id: string, action: 'like' | 'share' | 'comment') => void;
  onAddLog: (task: 'System' | 'Ollama' | 'FacebookAPI', level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR', message: string) => void;
}

export default function PageProfile({ 
  posts, 
  profile, 
  onUpdatePostStats, 
  onAddLog 
}: PageProfileProps) {
  const [activeSubTab, setActiveSubTab] = useState<'feed' | 'about'>('feed');

  // Handle Like simulation
  const handleLike = (id: string, titleIndex: number) => {
    onUpdatePostStats(id, 'like');
    onAddLog('FacebookAPI', 'SUCCESS', `Simulated like interaction on Facebook Post #${titleIndex + 1}.`);
  };

  // Handle Share simulation
  const handleShare = (id: string, titleIndex: number) => {
    onUpdatePostStats(id, 'share');
    onAddLog('FacebookAPI', 'SUCCESS', `Polled Facebook organic reach increase via simulated share of Post #${titleIndex + 1}.`);
    alert('Post shared successfully! This organically boosts page reach values in the Control Center metric line.');
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Visual Mock Facebook Page Area */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-md">
        
        {/* Cover Photo */}
        <div className="h-64 sm:h-72 w-full relative bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${profile.coverPhoto})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-md cursor-pointer transition-all border border-white/10 select-none">
            View cover photo
          </div>
        </div>

        {/* Profile Info Header Bar */}
        <div className="p-6 relative pt-0 border-b border-slate-100 bg-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16 sm:-mt-20 mb-4">
            {/* Profile Picture */}
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl border-4 border-white bg-slate-900 overflow-hidden shadow-md flex-shrink-0 relative z-10">
              <img src={profile.profilePic} className="w-full h-full object-cover" alt="Profile" />
            </div>
            
            {/* Name/category details */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-center sm:justify-start">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight flex items-center gap-2">
                  {profile.name}
                  <Check className="w-5 h-5 text-sky-500 fill-sky-500" />
                </h3>
              </div>
              <p className="text-sm font-semibold text-slate-500 font-sans mt-0.5">
                {profile.category} • {profile.followers.toLocaleString()} followers
              </p>
            </div>

            {/* Switch / Actions buttons */}
            <div className="flex gap-2.5">
              <a 
                href={profile.website} 
                target="_blank" 
                rel="noreferrer"
                className="cursor-pointer px-4.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/25 transition-all flex items-center gap-1.5"
              >
                Learn More
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Bio text block */}
          <div className="max-w-xl text-center sm:text-left">
            <p className="text-xs sm:text-sm text-slate-600 leading-normal">
              {profile.bio}
            </p>
          </div>

          {/* Mock Facebook Page Navigation Tabs */}
          <div className="flex gap-1.5 mt-8 border-t border-slate-100 pt-3 select-none">
            <button
              onClick={() => setActiveSubTab('feed')}
              className={`cursor-pointer px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeSubTab === 'feed'
                  ? 'bg-indigo-500/10 text-indigo-700'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              Feed / Published Posts
            </button>
            <button
              onClick={() => setActiveSubTab('about')}
              className={`cursor-pointer px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeSubTab === 'about'
                  ? 'bg-indigo-500/10 text-indigo-700'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              About / Page Info
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Content View depending on SubTab selected */}
      {activeSubTab === 'feed' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Feed area */}
          <div className="md:col-span-8 space-y-5">
            {posts.map((post, index) => {
              const totalReactions = Object.values(post.reactions).reduce((a, b) => a + b, 0);
              
              return (
                <div key={post.id} className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm space-y-4">
                  
                  {/* Author Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-100">
                      <img src={profile.profilePic} className="w-full h-full object-cover" alt="Author" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-slate-800 flex items-center gap-1.5">
                        {profile.name}
                        <Check className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold block leading-none mt-0.5">
                        Published • {post.publishedAt}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                    {post.content}
                  </p>

                  {/* Optional Canva Preview Link Card block */}
                  {post.canvaTemplateUrl && (
                    <a 
                      href={post.canvaTemplateUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="cursor-pointer block p-4 bg-slate-50 border border-slate-150 rounded-xl hover:bg-slate-100/50 transition-all group"
                    >
                      <div className="flex justify-between items-center text-xs text-indigo-600 font-semibold font-mono mb-1 select-none">
                        <span>CANVA DESIGN ASSET</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <h4 className="font-display font-semibold text-sm text-slate-800 truncate">
                        AI Task List Generator Presentation View
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {post.canvaTemplateUrl}
                      </p>
                    </a>
                  )}

                  {/* Interactions Stats Bar */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 border-t border-b border-slate-100 py-2.5">
                    <div className="flex items-center gap-2 select-none">
                      <span className="flex items-center -space-x-1">
                        <span className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center border border-white text-[8px] text-white">👍</span>
                        <span className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center border border-white text-[8px] text-white">❤️</span>
                        <span className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center border border-white text-[8px] text-white">💡</span>
                      </span>
                      <span>{totalReactions.toLocaleString()} reactions</span>
                    </div>
                    
                    <div className="flex gap-3">
                      <span>👁️ {post.reach.toLocaleString()} reach</span>
                      <span>💬 {post.comments} comments</span>
                      <span>🔄 {post.shares} shares</span>
                    </div>
                  </div>

                  {/* Operational Action Buttons */}
                  <div className="flex justify-around items-center pt-1 text-[11px] font-semibold text-slate-500 select-none">
                    <button 
                      onClick={() => handleLike(post.id, posts.length - 1 - index)}
                      className="cursor-pointer hover:text-indigo-600 flex items-center gap-1.5 hover:bg-indigo-50/50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      React
                    </button>
                    <button 
                      onClick={() => handleLike(post.id, posts.length - 1 - index)} // Trigger comment increment inside state
                      className="cursor-pointer hover:text-indigo-600 flex items-center gap-1.5 hover:bg-indigo-50/50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Comment
                    </button>
                    <button 
                      onClick={() => handleShare(post.id, posts.length - 1 - index)}
                      className="cursor-pointer hover:text-indigo-600 flex items-center gap-1.5 hover:bg-indigo-50/50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share to Group
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Right rail widgets */}
          <div className="md:col-span-4 space-y-5">
            <div className="bg-white p-5 rounded-md border border-slate-200/60 p-5 shadow-sm space-y-4">
              <h4 className="font-display font-semibold text-sm text-slate-800 flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-500" />
                Davao AI Automation Agency
              </h4>
              <p className="text-xs text-slate-500 leading-normal">
                Everything we build is designed for high-performance and absolute local privacy for business teams based in Davao and globally.
              </p>
              
              <div className="text-[11px] font-mono text-indigo-600 flex items-center justify-between pt-2 border-t border-slate-100">
                <span>MODEL TARGET:</span>
                <span>Ollama (Llama3)</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Detailed interactive replica of the About page section info requested by the user */
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-display font-semibold text-lg text-slate-800">
              Page Info / About Overview
            </h3>
            <p className="text-xs text-slate-500">
              This includes contact details and setup configurations linked directly into the Meta Graph variables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono text-slate-400 font-semibold block uppercase tracking-wider">
                Contact & Core Details
              </h4>
              
              <div className="space-y-4 text-slate-700 text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Globe className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">eCommerce Website</span>
                    <a href={profile.website} target="_blank" rel="noreferrer" className="block text-indigo-600 hover:underline font-medium mt-0.5">
                      {profile.website}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Contact Email</span>
                    <p className="block font-medium text-slate-800 mt-0.5">
                      {profile.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Location / Headquarters</span>
                    <p className="block font-medium text-slate-800 mt-0.5">
                      {profile.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Davao Phone Hotline</span>
                    <p className="block font-medium text-slate-800 mt-0.5">
                      {profile.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-mono text-slate-400 font-semibold block uppercase tracking-wider">
                Graph Api Registry Parameters
              </h4>
              
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-3 font-mono text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>PAGE_NAME:</span>
                  <span className="text-slate-800 font-semibold">{profile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>CATEGORY_ID:</span>
                  <span className="text-slate-800">Internet Company</span>
                </div>
                <div className="flex justify-between">
                  <span>FACEBOOK_PAGE_ID:</span>
                  <span className="text-slate-800 font-bold">{profile.pageId}</span>
                </div>
                <div className="flex justify-between">
                  <span>VERSION:</span>
                  <span className="text-slate-800">v21.0 (Live)</span>
                </div>
                <div className="flex justify-between">
                  <span>OAUTH_MODE:</span>
                  <span className="text-slate-800 text-sky-600 font-semibold">Page Token</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Helper inner component to replicate check mark
function Check({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
  );
}
