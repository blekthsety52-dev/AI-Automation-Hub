import React, { useState } from 'react';
import { 
  Megaphone, 
  Video, 
  Rocket, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  DollarSign, 
  Globe, 
  Target, 
  ThumbsUp,
  Cpu,
  Loader2,
  Copy,
  PlusCircle,
  Facebook,
  Bot
} from 'lucide-react';
import { Post } from '../types';

interface MarketingStudioProps {
  onAddPost: (newPostData: Omit<Post, 'id' | 'publishedAt' | 'reach' | 'reactions' | 'comments' | 'shares'>) => void;
  onAddLog: (task: string, level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR', message: string) => void;
  onBoostFollowers?: (amount: number) => void;
}

export default function MarketingStudio({ onAddPost, onAddLog, onBoostFollowers }: MarketingStudioProps) {
  const [activeSubTab, setActiveSubTab] = useState<'ads' | 'deploy' | 'reels'>('ads');

  // --- TAB 1: Ad Wizard State ---
  const [dailyBudget, setDailyBudget] = useState(5);
  const [targetLocation, setTargetLocation] = useState('Davao City, Philippines (+40km)');
  const [targetAge, setTargetAge] = useState('18 - 55');
  const [targetInterests, setTargetInterests] = useState('AI, SaaS, Digital Marketing, Locally Owned Businesses, E-commerce');
  const [adCreativeText, setAdCreativeText] = useState(
    '🚀 Want to automate your business workflow in Davao City? Join over 1,200 local founders learning real-time AI routines. Click "Like" to receive daily tips directly on your newsfeed! 👍'
  );
  const [isAdCreated, setIsAdCreated] = useState(false);

  // Calculated estimates based on budget
  const estimatedDailyReachMin = dailyBudget * 280;
  const estimatedDailyReachMax = dailyBudget * 820;
  const estimatedDailyPageLikesMin = Math.round(dailyBudget * 4.5);
  const estimatedDailyPageLikesMax = Math.round(dailyBudget * 12.8);

  // --- TAB 2: Deploy Content State ---
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [hasDeployed, setHasDeployed] = useState(false);

  // --- TAB 3: Reels Scripts State ---
  const [reelsTheme, setReelsTheme] = useState('AI Automation for Solopreneurs');
  const [isGeneratingReel, setIsGeneratingReel] = useState(false);
  const [generatedReelScript, setGeneratedReelScript] = useState<string>(
    `🎬 SECONDS 0-5: THE HOOK
[Visual]: Point at the screen with bold high-contrast text overlay reading: "Stop booking calendar meetings manually in 2026."
[Host Voiceover]: "This simple 3-line Python automation organizes your entire day while you sleep."

🎬 SECONDS 5-20: THE CORE VALUE
[Visual]: Quick screen share showing a Google Calendar events script synced with a local speech-to-text loop.
[Host Voiceover]: "Instead of emailing back-and-forth, your clients simply drop a 15-second voice memo. The AI parses the date, rates the task priority, and blocks the perfect slot in real-time."

🎬 SECONDS 20-30: CALLED TO ACTION
[Visual]: Point down where the link is. Text on screen: "👇 Try Free Link in Bio"
[Host Voiceover]: "No server fees, 100% private. Click follow to learn how we built this using standard local tools!"`
  );

  const reelsPresets = [
    {
      title: "Solopreneur Automation Tips",
      theme: "Unfair AI shortcuts for solo founders to save 12 hours a week"
    },
    {
      title: "Local Davao Tech Growth",
      theme: "How Davao startups are bypassing cloud costs using fully local Llama3 setups"
    },
    {
      title: "Productivity Hacks Showcase",
      theme: "Converting dynamic voice notes into complete prioritised Kanban boards"
    }
  ];

  // Ad generator copy
  const handleCopyAdText = () => {
    navigator.clipboard.writeText(adCreativeText);
    alert('Ad creative copied to clipboard! Ready to paste into Facebook Ads Manager.');
  };

  const handleLaunchLikesAd = () => {
    setIsAdCreated(true);
    onAddLog('FacebookAPI', 'SUCCESS', `Successfully compiled & verified $${dailyBudget}/day Page Likes Ad. Targeted to: ${targetLocation}`);
    if (onBoostFollowers) {
      onBoostFollowers(50); // immediate seed boost
      onAddLog('System', 'SUCCESS', `Simulated Page Ad Boost: Received +50 real-time followers!`);
    }
  };

  // Run Deploy content script
  const handleRunDeploy = async () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setHasDeployed(false);
    setDeployStep(1);
    setDeployLogs(['Initializing background content deployer script...']);

    onAddLog('System', 'INFO', 'Deploy trigger acknowledged. Deploying viral content queue...');

    const steps = [
      { text: 'Retrieving unscheduled drafts from Canva Catalogue...', run: () => {} },
      { text: 'Synchronizing Page Access tokens for graph.facebook.com endpoint...', run: () => {} },
      { text: 'Spinning up server-side Gemini 3.5 content generator proxy...', run: () => {} },
      { 
        text: 'Generating and publishing high-performing tech infographics...', 
        run: () => {
          onAddPost({
            content: "🔥 AUTOMATION HUB UPDATE:\n\nHow to get a highly responsive 3-post Facebook sales funnel designed in Canva and running with Llama3 & Node.js in Davao.\n\nType 'GUIDE' below and our automated chatbot will message you the step-by-step repository instantly!",
            type: 'Image',
            imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
            niche: 'AI & Creative Intelligence'
          });
        }
      },
      {
        text: 'Deploying high-reach viral reel script to catalog page...',
        run: () => {
          onAddPost({
            content: "🎬 REEL: STOP BOOKING MEETINGS MANUALLY IN 2026!\n\nThis simple voice-prompt AI runs locally, transcribes client voice memos, sorts them by true urgency, and inserts perfect blocks into your calendar.\n\nSave this reel and learn local developer loops! 🚀",
            type: 'Reel',
            niche: 'Productivity Hacks'
          });
        }
      },
      { text: 'Sending webhooks to Analytics Tracker loop module...', run: () => {} },
      { text: 'Queue deployed successfully! Page is actively posting in Live mode.', run: () => {} }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setDeployStep(i + 2);
      setDeployLogs(prev => [...prev, `➜ ${steps[i].text}`]);
      steps[i].run();
    }

    if (onBoostFollowers) {
      onBoostFollowers(180); // organic followers jump on deployment
    }
    
    setHasDeployed(true);
    setIsDeploying(false);
    onAddLog('FacebookAPI', 'SUCCESS', 'Content successfully posted live onto simulated Page Profile! Organic reach metrics boosted.');
  };

  // Reels script AI generation
  const handleGenerateReelsScript = async (themeToUse?: string) => {
    const activeTheme = themeToUse || reelsTheme;
    setIsGeneratingReel(true);
    onAddLog('GeminiAPI', 'INFO', `Generating reach-optimized Reels Script with topic: "${activeTheme}"`);

    try {
      const prompt = `Write a short, engaging, 30-second Facebook Reels/TikTok script on the topic: "${activeTheme}". 
Include:
1. Dynamic on-screen visual prompts
2. A high-retention 5-second Hook (bold text on screen)
3. Spoken dialogue lines
4. A highly actionable Call to Action (CTA) optimized for shares/comments.
Format it using clean, scannable Markdown.`;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          useHighThinking: false, // auto fast selected
          systemInstruction: 'You are a legendary short-form content director in Davao who crafts high-CPM viral Reels scripts with energetic pacing.'
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Gemini script generator returned error');
      }

      setGeneratedReelScript(data.text);
      onAddLog('GeminiAPI', 'SUCCESS', 'Reels script drafted successfully with Gemini 3.5 Flash.');
    } catch (err: any) {
      console.error(err);
      onAddLog('GeminiAPI', 'ERROR', `Reels generator failure: ${err.message}`);
      alert('Could not connect to Gemini API. Reverting to preset premium template.');
    } finally {
      setIsGeneratingReel(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Megaphone className="w-8 h-8 text-indigo-600 animate-pulse" />
            Marketing & Ads Studio
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Build $5/day follower ads, execute instantaneous viral content deployment, and generate high-reach Reels scripts.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200/50">
          <button
            onClick={() => setActiveSubTab('ads')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'ads' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            $5 Likes Ad
          </button>
          <button
            onClick={() => setActiveSubTab('deploy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'deploy' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            Deploy Now
          </button>
          <button
            onClick={() => setActiveSubTab('reels')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'reels' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Reels scripts
          </button>
        </div>
      </div>

      {/* RENDER AD INTERACTIVE WIZARD */}
      {activeSubTab === 'ads' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-6">
            <div>
              <h3 className="font-display font-semibold text-xl text-slate-800 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-500" />
                Page Likes Ad Configurator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Configure a $5/day Facebook Ad designed to rapidly increase your target audience.
              </p>
            </div>

            <div className="space-y-4">
              {/* Daily Budget Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-700 block">Daily Budget ($)</span>
                  <span className="text-sm font-bold text-indigo-600">${dailyBudget}.00 / day</span>
                </div>
                <input 
                  type="range" 
                  min={1} 
                  max={25} 
                  value={dailyBudget}
                  onChange={(e) => {
                    setDailyBudget(Number(e.target.value));
                    setIsAdCreated(false);
                  }}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="text-[10px] text-slate-400 block font-mono">
                  * A $5.00/day budget represents the optimal low-budget sweet spot for hyper-targeted local campaigns.
                </span>
              </div>

              {/* Location Input */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-700 block">Geographic Location</span>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input 
                    type="text"
                    value={targetLocation}
                    onChange={(e) => setTargetLocation(e.target.value)}
                    className="w-full text-xs p-3 pl-10 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Age targeting */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-700 block">Demographics (Age)</span>
                  <div className="relative">
                    <Target className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input 
                      type="text"
                      value={targetAge}
                      onChange={(e) => setTargetAge(e.target.value)}
                      className="w-full text-xs p-3 pl-10 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-700 block">Interests Detail</span>
                  <input 
                    type="text"
                    value={targetInterests}
                    onChange={(e) => setTargetInterests(e.target.value)}
                    className="w-full text-xs p-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Ad copy Editor */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-700 block">Primary Text / Ad Creative</span>
                <textarea 
                  value={adCreativeText}
                  onChange={(e) => setAdCreativeText(e.target.value)}
                  rows={4}
                  className="w-full text-xs p-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none"
                />
              </div>

              {/* Publish/Submit button */}
              <button
                onClick={handleLaunchLikesAd}
                className="w-full cursor-pointer py-3 rounded-xl bg-indigo-600 hover:bg-slate-900 transition-all text-white font-semibold text-xs flex items-center justify-center gap-2 shadow"
              >
                <Facebook className="w-4 h-4 fill-white text-indigo-600" />
                Launch $5/day Page Likes Ad Campaign
              </button>

              {isAdCreated && (
                <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-emerald-900">Campaign Uploaded Into Ad Set Simulator</h4>
                    <p className="mt-0.5">Parameters verified and active! An extra +50 followers was injected into your Page Profile to simulate standard 24h click conversion ratios.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Performance Estimates Side */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Visual Calculator Card */}
            <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-indigo-400">
                Daily Reach & Conversion index
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Davao Area Reach</span>
                  <span className="text-xl font-bold tracking-tight text-white block mt-1">
                    {estimatedDailyReachMin.toLocaleString()} - {estimatedDailyReachMax.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-zinc-500">Impressions / Day</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Est. Page Likes</span>
                  <span className="text-xl font-bold tracking-tight text-emerald-400 block mt-1">
                    +{estimatedDailyPageLikesMin} - +{estimatedDailyPageLikesMax}
                  </span>
                  <span className="text-[9px] text-zinc-500">Likes & Follows / Day</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Cost Per Page Like</span>
                  <span className="text-sm font-semibold block text-indigo-300 mt-0.5">$0.11 - $0.22</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Audience Delivery</span>
                  <span className="text-xs font-semibold bg-indigo-500/10 text-indigo-300 py-1 px-2.5 rounded border border-indigo-500/20 block mt-0.5">
                    HIGH TARGET QUALITY
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated Live Feed Ad Preview */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Live Facebook Feed Ad Preview
                </span>
                <span className="text-[9px] bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded">
                  Sponsored
                </span>
              </div>

              <div className="flex items-center gap-2 px-1">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Bot className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">AI Automation Hub</span>
                  <span className="text-[9px] text-slate-400 block">Suggested Post</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 px-1 leading-relaxed">
                {adCreativeText}
              </p>

              <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50 relative aspect-[1.91/1] flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80" 
                  alt="Promo Visual"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-slate-900/85 backdrop-blur-sm p-3 text-white flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Facebook Page</span>
                    <h5 className="text-xs font-bold mt-0.5">AI Automation - Tech & Tips</h5>
                  </div>
                  <button 
                    onClick={handleLaunchLikesAd}
                    className="cursor-pointer bg-white text-slate-900 px-3.5 py-1.5 rounded-lg text-[11px] font-bold shadow hover:bg-slate-100 flex items-center gap-1"
                  >
                    <ThumbsUp className="w-3 h-3 text-indigo-600 select-none" />
                    Like Page
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button 
                  onClick={handleCopyAdText}
                  className="cursor-pointer text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-50"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Creative Primary Text
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* RENDER CONTENT DEPLOY SCRIPT PANEL */}
      {activeSubTab === 'deploy' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-display font-semibold text-xl text-slate-800 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-indigo-500" />
                Davao AI Automation Content Deployer
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Run the central loop publisher module. Instantly compile all Canva catalogue mockups and schedule viral content.
              </p>
            </div>

            <button
              onClick={handleRunDeploy}
              disabled={isDeploying}
              className={`cursor-pointer px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow transition-all ${
                isDeploying 
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-slate-900 text-white'
              }`}
            >
              {isDeploying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deploying Viral Loop ...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  Run Central Deploy Script
                </>
              )}
            </button>
          </div>

          {/* Interactive Console Terminal Output */}
          <div className="bg-[#0b0f19] text-emerald-400 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-mono text-slate-500 ml-2">bash ~ deploy_content.sh</span>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded">
                Server-Side Webhook Active
              </span>
            </div>

            <div className="font-mono text-xs space-y-2 max-h-72 overflow-y-auto">
              {deployLogs.map((log, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {log}
                </div>
              ))}
              {isDeploying && (
                <div className="text-indigo-400 animate-pulse flex items-center gap-2">
                  <span>➜ Compiling creative media buffers...</span>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                </div>
              )}
              {deployLogs.length === 0 && (
                <div className="text-slate-500 py-8 text-center bg-slate-950/20 rounded-xl">
                  Ready. Click 'Run Central Deploy Script' to boot live container task loops.
                </div>
              )}
            </div>

            {hasDeployed && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-emerald-300 text-xs flex items-start gap-2.5 mt-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold">Content Queue Successfully Deployed!</h5>
                  <p className="mt-1 font-sans text-slate-300">
                    Your page received a huge jump of 180 organic followers due to simulated reach propagation, and 2 newly-composed viral posts were launched into the Facebook queue simulator! Note: view 'Page Profile' to view the newly active items.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}


      {/* RENDER REELS SCRIPT PLANNER */}
      {activeSubTab === 'reels' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Side */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col space-y-6">
            <div>
              <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2">
                <Video className="w-5 h-5 text-indigo-500" />
                Reels Script Generator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Generate highly immersive, retention-optimized short scripts using Gemini 3.5.
              </p>
            </div>

            {/* Quick Topic Presets */}
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
                Select High Reach Niche Topics
              </span>
              <div className="space-y-2">
                {reelsPresets.map((pr, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setReelsTheme(pr.theme);
                      handleGenerateReelsScript(pr.theme);
                    }}
                    className="w-full text-left p-3 text-xs bg-slate-50 border border-slate-100 rounded-xl hover:bg-indigo-50/50 hover:border-indigo-100 transition-all font-medium text-slate-700 flex justify-between items-center group cursor-pointer"
                  >
                    <div>
                      <span className="text-slate-800 font-semibold block group-hover:text-indigo-600 transition-colors">
                        {pr.title}
                      </span>
                      <span className="text-slate-400 font-normal mt-0.5 block line-clamp-1">{pr.theme}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            {/* Manual input */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                Custom Theme Hook
              </label>
              <textarea
                value={reelsTheme}
                onChange={(e) => setReelsTheme(e.target.value)}
                placeholder="Write a custom theme (e.g. 3 Canva tricks to bulk design product variant catalogs)"
                rows={3}
                className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white resize-none bg-slate-50"
              />
              <button
                onClick={() => handleGenerateReelsScript()}
                disabled={isGeneratingReel || !reelsTheme.trim()}
                className="w-full cursor-pointer py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow"
              >
                {isGeneratingReel ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Drafting script layout...
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    Generate Reels Script with Gemini
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Script Output Column */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  Interactive Teleprompter Script
                </span>
                <span className="text-xs font-bold text-slate-800 mt-1 block">Active Topic: {reelsTheme || 'Davao Tech Automation'}</span>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedReelScript);
                  alert('Reels script copied successfully!');
                }}
                className="cursor-pointer text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Script
              </button>
            </div>

            <div className="flex-1 bg-[#0b0f19] text-indigo-200 p-5 rounded-2xl border border-slate-800 font-mono text-xs overflow-y-auto leading-relaxed whitespace-pre-wrap max-h-[380px]">
              {generatedReelScript}
            </div>

            {/* Quick action button to simulation */}
            <div className="flex justify-end gap-3.5 pt-3">
              <button
                onClick={() => {
                  onAddPost({
                    content: `🎥 NEW ACTIVE REEL SCRIPT PREVIEW:\n\nTopic: ${reelsTheme}\n\n"${generatedReelScript.slice(0, 200)}..."\n\nFilming tomorrow in Davao! Save this reel so you don't miss the complete workflow guide. 🚀`,
                    type: 'Reel',
                    niche: 'Creative Intelligence'
                  });
                  onAddLog('System', 'SUCCESS', 'Saved Reels script template directly in simulated Pages Catalogue drafts queue!');
                  alert('Successfully posted script dummy teaser inside "Page Profile" list!');
                }}
                className="cursor-pointer px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow hover:shadow-lg"
              >
                <PlusCircle className="w-4 h-4" />
                Add Teaser post to Page Profile
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
