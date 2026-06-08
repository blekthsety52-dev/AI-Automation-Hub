import React, { useState } from 'react';
import { 
  Brain, 
  Wand2, 
  Sparkles, 
  Loader2, 
  Settings, 
  CheckCircle, 
  ExternalLink, 
  Image as ImageIcon,
  Send,
  Zap,
  Maximize2,
  Clock,
  LogOut,
  AlertCircle,
  FileSpreadsheet,
  Cpu
} from 'lucide-react';
import { Post } from '../types';

interface GeminiIntelligenceProps {
  onAddPost: (newPostData: Omit<Post, 'id' | 'publishedAt' | 'reach' | 'reactions' | 'comments' | 'shares'>) => void;
  onAddLog: (task: string, level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR', message: string) => void;
}

export default function GeminiIntelligence({ onAddPost, onAddLog }: GeminiIntelligenceProps) {
  // Conversational text state
  const [textPrompt, setTextPrompt] = useState('');
  const [useHighThinking, setUseHighThinking] = useState(true);
  const [systemInstruction, setSystemInstruction] = useState('You are an expert AI Social Media Director optimizing local businesses in Davao.');
  const [textResponse, setTextResponse] = useState<string>('');
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [textError, setTextError] = useState<string | null>(null);
  
  // Custom interactive reasoning progress for Pro model
  const [thinkingSteps, setThinkingSteps] = useState<string[]>([]);

  // Image Generation details
  const [imagePrompt, setImagePrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [useProModel, setUseProModel] = useState(true);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageModelUsed, setImageModelUsed] = useState('');

  // Example prompts for quick playground testing
  const textPresets = [
    { label: "Davao Tech Post", query: "Draft a high-engaging tech tip post for a Davao startup page focusing on the value of offline local AI automation." },
    { label: "Loop Bottleneck Script", query: "Write a high-performance javascript algorithm to detect scheduler thread-locks in background task workers." },
    { label: "Campaign Content Plan", query: "Develop an advanced 3-post sequential funnel campaign for internet marketing services, optimized for maximum shares." }
  ];

  const imagePresets = [
    { label: "Studio Tech Setup", query: "A professional studio photograph of a modern tech workspace in Davao, warm natural light, soft bokeh, high-end design" },
    { label: "AI Robot Skateboarding", query: "A sleek minimalist AI humanoid robot holding a crimson red skateboard, cyberpunk street aesthetics, photo-realistic 4K" },
    { label: "Product Mockup", query: "Sleek floating 3D render of a smart voice organizer speaker, cinematic neon blue backlighting, matte black finish" }
  ];

  // Text Generator handler
  const handleGenerateText = async (customPrompt?: string) => {
    const activePrompt = customPrompt || textPrompt;
    if (!activePrompt.trim()) return;

    setIsGeneratingText(true);
    setTextError(null);
    setTextResponse('');
    setThinkingSteps([]);

    onAddLog('GeminiAPI', 'INFO', `Triggered text generation. High Thinking: ${useHighThinking ? 'ENABLED (Gemini 3.1 Pro)' : 'DISABLED (Gemini 3.5 Flash)'}`);

    // If High Thinking is enabled, simulate / trace reasoning steps to match Gemini 3.1 Pro extended thinking
    if (useHighThinking) {
      const steps = [
        "Analyzing structural and domain boundaries...",
        "Evaluating offline task scheduling context...",
        "Resolving optimal prompt parameters for gemini-3.1-pro-preview...",
        "Executing extensive high-thinking semantic reasoning (8192 reasoning tokens allocated)..."
      ];
      
      for (let i = 0; i < steps.length; i++) {
        setThinkingSteps(prev => [...prev, steps[i]]);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    } else {
      setThinkingSteps(["Forwarding request instantly to auto-selected fast model (gemini-3.5-flash)..."]);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activePrompt,
          useHighThinking,
          systemInstruction
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server returned an error generating text');
      }

      setTextResponse(data.text);
      onAddLog('GeminiAPI', 'SUCCESS', `Content generated successfully using ${data.modelUsed}.`);
    } catch (err: any) {
      console.error(err);
      setTextError(err.message || 'Connect failure: Ensure your API key is configured correctly under Secrets.');
      onAddLog('GeminiAPI', 'ERROR', `Text generation failed: ${err.message}`);
    } finally {
      setIsGeneratingText(false);
    }
  };

  // Image Generator handler
  const handleGenerateImage = async (customPrompt?: string) => {
    const activePrompt = customPrompt || imagePrompt;
    if (!activePrompt.trim()) return;

    setIsGeneratingImage(true);
    setImageError(null);
    setGeneratedImageUrl('');

    const modelName = useProModel ? 'gemini-3-pro-image (Nano Banana Pro)' : 'gemini-3.1-flash-image';
    onAddLog('GeminiAPI', 'INFO', `Starting studio image render with ${modelName}. Size: ${imageSize}, Aspect: ${aspectRatio}`);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activePrompt,
          imageSize,
          aspectRatio,
          useProModel
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server error during image synthesis');
      }

      setGeneratedImageUrl(data.imageUrl);
      setImageModelUsed(data.modelUsed);
      onAddLog('GeminiAPI', 'SUCCESS', `Studio-quality image rendered successfully using ${data.modelUsed}.`);
    } catch (err: any) {
      console.error(err);
      setImageError(err.message || 'Compilation issue: Make sure your GEMINI_API_KEY is configured under Settings > Secrets.');
      onAddLog('GeminiAPI', 'ERROR', `Image generation failed: ${err.message}`);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Direct Publish Action
  const handleAddToQueue = () => {
    if (!generatedImageUrl && !textResponse) return;

    onAddPost({
      content: textResponse || `✨ Newly rendered visual artifact.\n\nCreated using ${imageModelUsed} inside the Gemini Intelligence Sandbox with high rendering fidelity.`,
      type: 'Image',
      imageSrc: generatedImageUrl || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
      niche: 'AI & Creative Intelligence'
    });

    onAddLog('System', 'SUCCESS', 'Published generated Gemini asset directly to the Facebook queue simulator!');
    alert("Successfully published post to the simulator queue! Check 'Page Profile' to view it published.");
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Brain className="w-8 h-8 text-indigo-600 animate-pulse" />
            Gemini Network Intelligence
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Access secure server-side Gemini 3 series models. Draft smart strategies with High Thinking reasoning or render studio 4K images instantly.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs py-2 px-3 rounded-xl font-mono">
          <Zap className="w-3.5 h-3.5 text-indigo-600" />
          <span>Active Endpoint: Server-Side Proxied</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Text Assistant Panel */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col space-y-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-500" />
                Reasoning Architect & Strategy Draft
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Define constraints to construct rich copies or evaluate systemic log queues.</p>
            </div>
            
            {/* Thinking Level Toggle */}
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={useHighThinking} 
                onChange={(e) => setUseHighThinking(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              <span className="ml-2 text-xs font-semibold text-slate-600 font-sans flex items-center gap-1">
                High Thinking
              </span>
            </label>
          </div>

          {/* Model Status Indicator */}
          <div className={`p-3 rounded-xl flex items-center gap-2 text-xs border ${
            useHighThinking 
              ? 'bg-purple-50/70 border-purple-100 text-purple-900' 
              : 'bg-emerald-50/70 border-emerald-100 text-emerald-900'
          }`}>
            <Cpu className="w-4 h-4 flex-shrink-0" />
            <span>
              {useHighThinking 
                ? "Allocating Gemini 3.1 Pro Preview with extended deep thinking logic enabled."
                : "Best model chosen automatically at runtime: Gemini 3.5 Flash for high performance."
              }
            </span>
          </div>

          {/* System instructions configuration box */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
              System Instruction Context
            </label>
            <input 
              type="text" 
              value={systemInstruction}
              onChange={(e) => setSystemInstruction(e.target.value)}
              className="text-xs w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50/60"
              placeholder="e.g. You are a content marketer of automated loops..."
            />
          </div>

          {/* Prompt Preset Grid */}
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5">
              Quick Presets
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {textPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTextPrompt(preset.query);
                    handleGenerateText(preset.query);
                  }}
                  className="p-2 text-left text-xs bg-slate-50 border border-slate-100 rounded-xl hover:bg-indigo-50/50 hover:border-indigo-100 transition-all text-slate-700 font-medium"
                >
                  <Sparkles className="w-3 h-3 text-indigo-500 inline mr-1 mb-0.5" />
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Block */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
              Custom Reasoning Query
            </label>
            <div className="relative">
              <textarea
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                placeholder="What complex campaign, code bottleneck, or automated tips list do you want to analyze?"
                rows={4}
                className="w-full text-sm p-3.5 pr-12 border border-slate-200 rounded-xl bg-slate-50/20 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white resize-none"
              />
              <button 
                onClick={() => handleGenerateText()}
                disabled={isGeneratingText || !textPrompt.trim()}
                className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-indigo-600 hover:bg-slate-900 text-white transition-all shadow-md hover:shadow-lg disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
              >
                {isGeneratingText ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Thinking Steps / Process Logs for Pro reasoning */}
          {thinkingSteps.length > 0 && (
            <div className="bg-slate-900 text-slate-300 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                  Google Gemini reasoning trace...
                </span>
              </div>
              <div className="space-y-1.5 font-mono text-[11px] leading-relaxed select-none">
                {thinkingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-indigo-500">➜</span>
                    <span>{step}</span>
                  </div>
                ))}
                {isGeneratingText && (
                  <div className="flex items-center gap-1.5 text-slate-500 animate-pulse">
                    <span>⚡ Processing logical output nodes...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Text Response panel */}
          {textError && (
            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl flex items-start gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-900">Gemini Key or Configuration Request</p>
                <p className="mt-0.5">{textError}</p>
              </div>
            </div>
          )}

          {textResponse && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  AI Generated Architecture Strategy
                </span>
                <button 
                  onClick={handleAddToQueue}
                  className="cursor-pointer text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/70 py-1 px-2.5 rounded-lg transition-all"
                >
                  Publish Copy to Facebook Queue
                </button>
              </div>
              <div className="border border-slate-100 bg-[#f8fafc]/50 p-4 rounded-xl text-slate-700 text-sm whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                {textResponse}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Image Lab Panel */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col space-y-5">
          <div>
            <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-pink-500" />
              Studio 4K Image Render Lab
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Input complex text concepts to generate high-fidelity assets using Nano Banana Pro.</p>
          </div>

          {/* Image Settings */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Studio Pro Resolution Mode</label>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={useProModel} 
                  onChange={(e) => setUseProModel(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-600"></div>
                <span className="ml-2 text-xs font-semibold text-slate-600 font-sans">
                  Nano Banana Pro
                </span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="text-xs w-full p-2 border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-700 font-medium cursor-pointer"
                >
                  <option value="1:1">1:1 (Square)</option>
                  <option value="16:9">16:9 (Landscape)</option>
                  <option value="9:16">9:16 (Portrait)</option>
                  <option value="4:3">4:3 (Traditional)</option>
                  <option value="3:4">3:4 (Vertical)</option>
                  <option value="4:1">4:1 (Panoramic Wide)</option>
                  <option value="1:4">1:4 (Panoramic Tall)</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Render Resolution
                </label>
                <select
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value)}
                  className="text-xs w-full p-2 border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-700 font-medium cursor-pointer"
                >
                  <option value="512px">512px (Fast draft)</option>
                  <option value="1K">1K (Standard HD)</option>
                  <option value="2K">2K (High Resolution)</option>
                  <option value="4K">4K (Studio Ultra-HD)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preset Prompts */}
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5">
              Preset Styles
            </span>
            <div className="flex flex-wrap gap-1.5">
              {imagePresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setImagePrompt(preset.query);
                    handleGenerateImage(preset.query);
                  }}
                  className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-100 rounded-lg hover:bg-pink-50/50 hover:border-pink-100 transition-all text-slate-700 font-medium"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Entry */}
          <div className="space-y-2">
            <textarea
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder="Describe the studio-quality 4K graphic assets you would like to generate..."
              rows={3}
              className="w-full text-xs p-3 border border-slate-200 rounded-xl bg-slate-50/20 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:bg-white resize-none font-medium"
            />
            <button
              onClick={() => handleGenerateImage()}
              disabled={isGeneratingImage || !imagePrompt.trim()}
              className="w-full cursor-pointer py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-sans font-semibold text-xs flex items-center justify-center gap-1.5 shadow focus:outline-none disabled:opacity-20 disabled:cursor-not-allowed"
            >
              {isGeneratingImage ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Rendering High-Quality Canvas...
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5" />
                  Generate 4K Studio Asset
                </>
              )}
            </button>
          </div>

          {/* Render Outcome display */}
          {imageError && (
            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl flex items-start gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-900">Image Render Error</p>
                <p className="mt-0.5">{imageError}</p>
              </div>
            </div>
          )}

          {generatedImageUrl ? (
            <div className="space-y-3.5">
              <div className="overflow-hidden rounded-xl border border-slate-200 relative group aspect-square bg-slate-50 flex items-center justify-center">
                <img 
                  src={generatedImageUrl} 
                  alt="AI Generated Hub Artifact" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl transition duration-300"
                />
                
                {/* Resolution Stamp */}
                <div className="absolute top-3 left-3 bg-slate-900/85 text-emerald-400 font-mono text-[9px] px-2 py-0.5 rounded border border-slate-800">
                  {imageSize} RENDERED
                </div>
              </div>

              {/* Action Rows */}
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={generatedImageUrl} 
                  download="gemini-4k-render.png"
                  className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  Download Source
                </a>
                <button
                  onClick={handleAddToQueue}
                  className="cursor-pointer py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  Add to Page Queue
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl py-12 bg-slate-50/50">
              {isGeneratingImage ? (
                <div className="text-center space-y-2">
                  <Cpu className="w-10 h-10 text-indigo-400 animate-spin mx-auto" />
                  <p className="text-xs font-mono text-slate-500">Contacting Nano Pro Supercomputer...</p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-400 font-medium">Render preview will load here</p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
