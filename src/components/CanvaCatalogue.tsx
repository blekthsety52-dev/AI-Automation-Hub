import React, { useState } from 'react';
import { 
  PlusCircle, 
  Trash2, 
  Sparkles, 
  Database, 
  Check, 
  FileCode, 
  ArrowRight,
  TrendingDown,
  Layers,
  Award,
  BookOpen,
  RefreshCw,
  Layout,
  DollarSign
} from 'lucide-react';
import { ProductFeedItem, CanvaDesign } from '../types';

interface CanvaCatalogueProps {
  onAddLog: (task: 'System' | 'Ollama' | 'FacebookAPI', level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR', message: string) => void;
}

const DEFAULT_FEED: ProductFeedItem[] = [
  { id: '1234', name: 'Striped Rug', description: 'Black and white striped wool rug, minimalist modern accent.', price: '24.99 USD' },
  { id: '5678', name: 'Fuzzy Blanket', description: 'For chilly days, extremely cozy faux-fur plush blanket.', price: '14.99 USD' },
  { id: '9123', name: 'Accent Pillow', description: 'Red velvet round pillow with elegant tufted gold button.', price: '9.99 USD' }
];

const DEFAULT_DESIGNS: CanvaDesign[] = [
  {
    id: 'design-1',
    name: 'Instagram Square Promo',
    type: 'Post',
    canvaLink: 'https://canva.link/p07pkmwldl6j1jx',
    thumbnail: '🧠',
    fields: ['name', 'price', 'description']
  },
  {
    id: 'design-2',
    name: 'Facebook Banner Deal',
    type: 'Ad',
    canvaLink: 'https://canva.link/c7gcsfoby37noh2',
    thumbnail: '🔮',
    fields: ['name', 'price']
  }
];

export default function CanvaCatalogue({ onAddLog }: CanvaCatalogueProps) {
  const [productFeed, setProductFeed] = useState<ProductFeedItem[]>(DEFAULT_FEED);
  const [canvaDesigns] = useState<CanvaDesign[]>(DEFAULT_DESIGNS);

  // New product item form fields
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('');

  // Bulk creation workflow simulation state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStep, setSyncStep] = useState(0);
  const [generatedAssetTexts, setGeneratedAssetTexts] = useState<any[]>([]);

  // Add catalog item
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice.trim()) return;

    const newItem: ProductFeedItem = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      name: newName,
      description: newDesc,
      price: newPrice.includes('USD') ? newPrice : `${newPrice} USD`
    };

    setProductFeed([...productFeed, newItem]);
    onAddLog('System', 'SUCCESS', `Added product [${newItem.id}] "${newItem.name}" to the Meta Catalog database feed.`);
    
    setNewName('');
    setNewDesc('');
    setNewPrice('');
  };

  // Remove catalog item
  const handleRemoveProduct = (id: string, name: string) => {
    setProductFeed(productFeed.filter(p => p.id !== id));
    onAddLog('System', 'INFO', `Removed product [${id}] "${name}" from the product feed.`);
  };

  // Run bulk binding generator simulation
  const handleBulkSync = () => {
    setIsSyncing(true);
    setSyncStep(1); // Mappings
    onAddLog('System', 'INFO', 'Connecting variables: mapping Catalog headers (name, price, description) with Canva tags...');

    setTimeout(() => {
      setSyncStep(2); // Auto-binding values
      onAddLog('Ollama', 'SUCCESS', `Llama3 successfully bound ${productFeed.length} feed entries to 2 Canva designs.`);
    }, 1500);

    setTimeout(() => {
      setSyncStep(3); // Generated success
      const generated: any[] = [];
      
      productFeed.forEach(product => {
        canvaDesigns.forEach(design => {
          generated.push({
            id: `gen-${product.id}-${design.id}`,
            productName: product.name,
            productPrice: product.price,
            productDesc: product.description,
            designName: design.name,
            designType: design.type,
            thumbnail: design.thumbnail
          });
        });
      });

      setGeneratedAssetTexts(generated);
      onAddLog('System', 'SUCCESS', `Bulk-created ${generated.length} on-brand advertising assets! All templates synched with live Meta catalog data.`);
      setIsSyncing(false);
    }, 3200);
  };

  const handleResetSync = () => {
    setGeneratedAssetTexts([]);
    setSyncStep(0);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-7xl mx-auto">
      {/* Module Header */}
      <div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">
          Canva Catalogue Sync
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Automate post assets design by integrating your Meta eCommerce product catalog straight into Canva templates using smart variables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: catalog eCommerce manager */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              Meta Product Feed Catalog
            </h3>
            
            {/* Catalog Grid Table */}
            <div className="overflow-x-auto text-[13px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-mono text-[10px] uppercase text-left tracking-wider">
                    <th className="py-2.5">ID</th>
                    <th className="py-2.5">Product Name</th>
                    <th className="py-2.5">Description</th>
                    <th className="py-2.5">Price</th>
                    <th className="py-2.5 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
                  {productFeed.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 font-mono font-medium text-slate-400 text-xs">#{item.id}</td>
                      <td className="py-3 font-semibold text-slate-800">{item.name}</td>
                      <td className="py-3 text-slate-500 max-w-[200px] truncate">{item.description}</td>
                      <td className="py-3 font-semibold text-indigo-600 font-mono text-xs">{item.price}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleRemoveProduct(item.id, item.name)}
                          className="cursor-pointer text-slate-400 hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {productFeed.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-350 italic">
                        Empty feed! Fill values below to load products.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Form to insert catalog item */}
            <form onSubmit={handleAddProduct} className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-mono text-slate-400 font-semibold block mb-3 uppercase tracking-wider">
                Add Premium Catalog Item
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <input
                  type="text"
                  required
                  placeholder="e.g. tufted wool rug"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Accent velvet descriptions"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="24.99 USD"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full text-xs pl-8 p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium text-xs shadow hover:shadow-md transition-all flex items-center gap-1.5 ml-auto"
              >
                <PlusCircle className="w-4 h-4" />
                Add Item Feed
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Canva Design list & Bulk Create */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-lg text-slate-800 flex items-center gap-2">
              <Layout className="w-5 h-5 text-indigo-600" />
              Connected Canva Templates
            </h3>
            
            <div className="space-y-3">
              {canvaDesigns.map((design) => (
                <div key={design.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-lg shadow-sm border border-indigo-100">
                      {design.thumbnail}
                    </span>
                    <div>
                      <h4 className="font-display font-semibold text-sm text-slate-800">
                        {design.name}
                      </h4>
                      <div className="flex gap-1.5 mt-1.5">
                        {design.fields.map(field => (
                          <span key={field} className="text-[9px] bg-slate-200/70 border border-slate-300/40 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                            {'{'}{field}{'}'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <span className="text-[10px] bg-slate-105 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full font-sans font-medium uppercase font-semibold">
                    {design.type}
                  </span>
                </div>
              ))}
            </div>

            {/* Sync trigger */}
            {productFeed.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-4">
                {isSyncing ? (
                  <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-indigo-700">
                      <span className="font-semibold flex items-center gap-1.5 animate-pulse">
                        <RefreshCw className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                        {syncStep === 1 ? 'Mapping custom headers...' : 'Binding feed entries to designs...'}
                      </span>
                      <span>{syncStep * 33}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-sky-400 to-indigo-600 transition-all duration-300"
                        style={{ width: `${syncStep * 33}%` }}
                      />
                    </div>
                  </div>
                ) : generatedAssetTexts.length > 0 ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetSync}
                      className="cursor-pointer flex-1 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold text-xs border border-slate-200 transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      Reset Queue
                    </button>
                    <button
                      onClick={() => alert('Exporting as Zip file. Total simulated files: ' + generatedAssetTexts.length)}
                      className="cursor-pointer flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-xs shadow-md shadow-indigo-500/10 transition-all flex items-center justify-center gap-1.5"
                    >
                      Download ZIP Package
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleBulkSync}
                    className="w-full cursor-pointer py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl font-medium text-xs shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/25 transition-all text-center flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Bulk Bind Products to Designs
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Synched asset output display */}
      {generatedAssetTexts.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="font-display font-semibold text-lg text-white leading-none">
                  Live Generated Advertising Assets
                </h3>
                <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase block tracking-wider">
                  Live Data Bind variations ({generatedAssetTexts.length})
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded uppercase tracking-widest font-semibold flex items-center gap-1.5 select-none">
              <Check className="w-3.5 h-3.5" />
              Sync complete
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {generatedAssetTexts.map((asset) => (
              <div key={asset.id} className="relative glass-panel shadow-none border-[#ffffff]/10 text-white h-44 rounded-2xl flex flex-col justify-between overflow-hidden bg-slate-950 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xl bg-slate-900 w-8 h-8 rounded-lg flex items-center justify-center select-none border border-slate-800">{asset.thumbnail}</span>
                  <span className="text-[9px] font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.2 rounded font-semibold tracking-wider">{asset.designType}</span>
                </div>

                <div>
                  <h4 className="font-display font-bold text-sm tracking-tight text-white mb-0.5 truncate">{asset.productName}</h4>
                  <p className="text-[9px] text-slate-400 line-clamp-2 leading-normal mb-1">{asset.productDesc}</p>
                  <span className="text-[10px] text-cyan-400 font-mono tracking-tight font-semibold block">{asset.productPrice}</span>
                </div>

                <div className="text-[9px] text-slate-400/80 font-mono border-t border-slate-900 pt-1.5 truncate uppercase tracking-widest">
                  {asset.designName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
