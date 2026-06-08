import React, { useState } from 'react';
import { 
  Save, 
  Bot, 
  Facebook, 
  MapPin, 
  Cpu, 
  Key, 
  Info,
  CheckCircle,
  FileCode,
  Workflow
} from 'lucide-react';
import { PageProfileData } from '../types';

interface SettingsPanelProps {
  profile: PageProfileData;
  onUpdateProfile: (data: Partial<PageProfileData>) => void;
  onAddLog: (task: 'System' | 'Ollama' | 'FacebookAPI', level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR', message: string) => void;
}

export default function SettingsPanel({ 
  profile, 
  onUpdateProfile, 
  onAddLog 
}: SettingsPanelProps) {
  // Local state for configuration fields
  const [pageName, setPageName] = useState(profile.name);
  const [pageId, setPageId] = useState(profile.pageId);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [location, setLocation] = useState(profile.location);
  const [website, setWebsite] = useState(profile.website);
  
  // AI Config variables
  const [aiUrl, setAiUrl] = useState('http://localhost:11434/v1');
  const [aiModel, setAiModel] = useState('llama3');
  const [aiApiKey, setAiApiKey] = useState('ollama');

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: pageName,
      pageId: pageId,
      phone: phone,
      email: email,
      location: location,
      website: website
    });

    onAddLog('System', 'SUCCESS', `Reconfigured .env credentials. Set Page ID to [${pageId}] and local model to ${aiModel}.`);
    
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">
          Configuration & Environment Settings
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Adjust the environment variables, Llama3 models, and Facebook Page credentials. Saving updates the mock `.env` file states.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2.5">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <p className="text-sm font-medium">Configurations saved and synchronized successfully to active dashboard processes!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Facebook Page API Config */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
          <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2">
            <Facebook className="w-5 h-5 text-[#1877f2]" />
            Meta Pages API Registration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                FACEBOOK_PAGE_ID
              </label>
              <input
                type="text"
                value={pageId}
                onChange={(e) => setPageId(e.target.value)}
                className="text-xs w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                PAGE_NAME
              </label>
              <input
                type="text"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
                className="text-xs w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Row 2: AI Loop configs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
          <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            AI LLM Process Configuration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                AI_BASE_URL (Ollama/OpenAI)
              </label>
              <input
                type="text"
                value={aiUrl}
                onChange={(e) => setAiUrl(e.target.value)}
                className="text-xs w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                AI_MODEL
              </label>
              <input
                type="text"
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="text-xs w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                AI_API_KEY
              </label>
              <input
                type="password"
                value={aiApiKey}
                onChange={(e) => setAiApiKey(e.target.value)}
                className="text-xs w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Row 3: About Davao Page details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
          <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-600" />
            Business Details & Davao Alignment
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                Headquarters Address / Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-xs w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                Davao Phone Hotline
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-xs w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-xs w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                eCommerce Launch Website
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="text-xs w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="cursor-pointer py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            Save Environmental Credentials
          </button>
        </div>
      </form>
    </div>
  );
}
