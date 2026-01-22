
import React, { useState } from 'react';
import { Environment, FuelType, UserPreferences, RecommendationResult, IdentifiedCar, DemandLevel } from './types';
import { getRecommendations } from './services/recommendationEngine';
import { ImageUploader } from './components/ImageUploader';
import { CarCard } from './components/CarCard';

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6 text-center">
    <div className="max-w-4xl">
      <div className="mb-6 inline-block bg-blue-500/20 px-4 py-1.5 rounded-full border border-blue-400/30 text-blue-300 font-medium text-sm">
        Mini Project: CS-504 Machine Learning & Decision Support
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
        Intelligent Vehicle <span className="text-blue-400">Identification</span> & Strategy
      </h1>
      <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
        An advanced expert system bridging computer vision and weighted recommendation engines to provide transparent, data-driven mobility decisions for the <span className="text-white font-bold underline decoration-blue-500">Indian Market 2025</span>.
      </p>
      <button 
        onClick={onStart}
        className="group relative bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-blue-500/20"
      >
        Launch 2025 Engine
        <span className="ml-2 transition-transform group-hover:translate-x-1 inline-block">→</span>
      </button>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'main'>('landing');
  const [activeTab, setActiveTab] = useState<'identify' | 'recommend'>('identify');
  const [identifiedCar, setIdentifiedCar] = useState<IdentifiedCar | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  
  const [prefs, setPrefs] = useState<UserPreferences>({
    budget: 2000000, 
    preferredCompany: '',
    preferredModel: '',
    preferredFuel: 'Any' as any,
    seats: 5,
    primaryEnvironment: Environment.CITY,
    preferredDemand: 'Any' as any
  });

  const handleIdentify = (car: IdentifiedCar, base64: string) => {
    setIdentifiedCar(car);
    setUploadedImage(base64);
    setIsFlipped(false);
  };

  const handleRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    const results = getRecommendations(prefs);
    setRecommendations(results);
    setActiveTab('recommend');
  };

  if (view === 'landing') return <LandingPage onStart={() => setView('main')} />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">VehicleWise AI <span className="text-blue-600 font-black">2025</span></span>
          </div>
          <nav className="flex gap-4">
            <button 
              onClick={() => setActiveTab('identify')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'identify' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Identify
            </button>
            <button 
              onClick={() => setActiveTab('recommend')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'recommend' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              2025 Recommendations
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        {activeTab === 'identify' ? (
          <div className="space-y-12">
            <ImageUploader onIdentification={handleIdentify} />
            
            {identifiedCar && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-1/2 order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Visual Processing Complete (2025 Context)
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-800 mb-2">{identifiedCar.manufacturer} {identifiedCar.model}</h2>
                    <p className="text-slate-400 text-lg mb-8 italic">"{identifiedCar.designAnalysis}"</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Company</p>
                        <p className="font-bold text-slate-800 text-lg">{identifiedCar.manufacturer}</p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Model Variant</p>
                        <p className="font-bold text-slate-800 text-lg">{identifiedCar.model}</p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Color Palette</p>
                        <p className="font-bold text-slate-800 text-lg flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full shadow-inner" style={{backgroundColor: identifiedCar.color.toLowerCase()}}></span>
                          {identifiedCar.color}
                        </p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Drivetrain</p>
                        <p className="font-bold text-slate-800 text-lg">{identifiedCar.fuelType}</p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 col-span-2">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Estimated 2025 Market Price</p>
                        <p className="font-black text-green-600 text-2xl">{identifiedCar.estimatedPrice}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/2 order-1 lg:order-2 flex flex-col items-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Click to Toggle Design View</p>
                    <div 
                      className="perspective-card w-full aspect-[4/3] cursor-pointer group"
                      onClick={() => setIsFlipped(!isFlipped)}
                    >
                      <div className={`perspective-card-inner h-full w-full shadow-2xl rounded-[2.5rem] transition-all duration-700 ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                        <div className="card-front bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl">
                          {uploadedImage ? (
                            <img src={uploadedImage} alt="Uploaded vehicle" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100">
                               <span className="text-slate-300 font-bold italic">Processing Frame...</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />
                        </div>

                        <div className="card-back bg-slate-800 text-white rounded-[2.5rem] p-10 flex flex-col justify-center items-center border-4 border-blue-500 shadow-blue-500/20 shadow-2xl">
                           <div className="bg-blue-600/20 p-6 rounded-full mb-6">
                              <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                              </svg>
                           </div>
                           <h4 className="text-2xl font-black mb-4 tracking-tighter">2025 TECH SCHEMA</h4>
                           <div className="space-y-4 w-full text-center">
                              <div className="py-2 border-b border-white/10">
                                <span className="text-blue-400 text-xs font-black uppercase">Architecture</span>
                                <p className="font-bold">Optimized {identifiedCar.bodyType} Build</p>
                              </div>
                              <div className="py-2 border-b border-white/10">
                                <span className="text-blue-400 text-xs font-black uppercase">Precision Score</span>
                                <p className="font-bold">{(identifiedCar.confidence * 100).toFixed(2)}% AI Confidence</p>
                              </div>
                              <div className="py-2">
                                <span className="text-blue-400 text-xs font-black uppercase">Market Status</span>
                                <p className="font-bold">Active 2025 Inventory</p>
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <aside className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-8 bg-blue-600 rounded-full" />
                  <h3 className="text-2xl font-black text-slate-800">2025 Strategy</h3>
                </div>
                <form onSubmit={handleRecommendation} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Budget Cap (₹)</label>
                    <input 
                      type="number" 
                      value={prefs.budget} 
                      onChange={e => setPrefs({...prefs, budget: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                    />
                    <p className="mt-1 text-[10px] text-slate-400 italic">Formatting: ₹{prefs.budget.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Brand Loyalty</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Tata, Mahindra, Toyota..."
                      value={prefs.preferredCompany} 
                      onChange={e => setPrefs({...prefs, preferredCompany: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">2025 Fuel Choice</label>
                    <select 
                      value={prefs.preferredFuel}
                      onChange={e => setPrefs({...prefs, preferredFuel: e.target.value as any})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                    >
                      <option value="Any">All Powerplants</option>
                      <option value={FuelType.ELECTRIC}>EV (Clean Mobility)</option>
                      <option value={FuelType.HYBRID}>Strong Hybrid</option>
                      <option value={FuelType.PETROL}>Petrol</option>
                      <option value={FuelType.DIESEL}>Diesel (Torque Focus)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Seating Configuration</label>
                    <input 
                      type="number" 
                      min="2"
                      max="8"
                      value={prefs.seats} 
                      onChange={e => setPrefs({...prefs, seats: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Operating Environment</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.values(Environment).map(env => (
                        <button
                          key={env}
                          type="button"
                          onClick={() => setPrefs({...prefs, primaryEnvironment: env})}
                          className={`text-center px-2 py-3 rounded-xl text-[10px] font-black transition-all border ${prefs.primaryEnvironment === env ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-400'}`}
                        >
                          {env.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Market Intensity</label>
                    <select 
                      value={prefs.preferredDemand}
                      onChange={e => setPrefs({...prefs, preferredDemand: e.target.value as any})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                    >
                      <option value="Any">Any Demand Level</option>
                      <option value={DemandLevel.HIGH}>High Demand (Waiting Period likely)</option>
                      <option value={DemandLevel.MEDIUM}>Stable Demand</option>
                      <option value={DemandLevel.LOW}>Niche / Emerging</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-slate-900 text-white font-black py-5 rounded-[2rem] hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-slate-300"
                  >
                    Analyze 2025 Market
                  </button>
                </form>
              </div>
            </aside>

            <div className="lg:col-span-3">
              {recommendations.length > 0 ? (
                <div className="space-y-10">
                  <div className="flex flex-col md:flex-row items-end justify-between border-b border-slate-200 pb-8">
                    <div>
                      <h2 className="text-4xl font-black text-slate-800 tracking-tighter">2025 Market Strategy</h2>
                      <p className="text-slate-500 font-medium">Ranked by 2025 technical specifications & demand forecasting</p>
                    </div>
                    <div className="mt-4 md:mt-0 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Dataset: Indian Market 2025</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {recommendations.slice(0, 6).map(rec => (
                      <CarCard key={rec.car.id} recommendation={rec} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center bg-white rounded-[3rem] border-4 border-dashed border-slate-100 text-center p-20 shadow-inner">
                  <div className="bg-slate-50 p-10 rounded-full mb-8 shadow-sm">
                    <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-black text-slate-800 mb-4">Select 2025 Criteria</h3>
                  <p className="text-slate-400 max-w-sm text-lg leading-relaxed">
                    Adjust the sidebar filters to see our expert system's top vehicle picks for the upcoming Indian automotive year.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left items-center">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="bg-slate-900 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-black text-2xl text-slate-800 tracking-tighter">VehicleWise AI</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">
              © 2025 Intelligent Mobility Decision Support System. Specialized for the evolving Indian Market.
            </p>
            <div className="flex justify-center md:justify-end gap-6 opacity-40 hover:opacity-100 transition-opacity duration-500">
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" className="h-6 w-6 grayscale" alt="Web-tech" />
               <div className="font-black text-xs uppercase tracking-widest text-slate-900">React 19</div>
               <div className="font-black text-xs uppercase tracking-widest text-slate-900">Gemini 3</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
