
import React, { useState } from 'react';
import { RecommendationResult, BodyType } from '../types';

interface CarCardProps {
  recommendation: RecommendationResult;
}

export const CarCard: React.FC<CarCardProps> = ({ recommendation }) => {
  const { car, score, explanations } = recommendation;
  const [activeImage, setActiveImage] = useState(car.imageUrl);

  return (
    <div className="perspective-card w-full h-[520px] cursor-pointer group">
      <div className="perspective-card-inner h-full w-full shadow-2xl rounded-3xl">
        
        {/* Front Face */}
        <div className="card-front bg-white rounded-3xl overflow-hidden border border-slate-200 flex flex-col">
          <div className="relative h-56 overflow-hidden">
            <img 
              src={activeImage} 
              alt={car.model} 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-xl z-10">
              {score}% MATCH
            </div>
            
            {/* Gallery Mini-Thumbnails Overlay */}
            <div className="absolute bottom-4 left-4 flex gap-2 z-10">
              {car.galleryUrls.map((url, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setActiveImage(url)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(url);
                  }}
                  className={`w-10 h-10 rounded-lg border-2 overflow-hidden transition-all transform hover:scale-110 ${activeImage === url ? 'border-white scale-110' : 'border-white/30 hover:border-white/60'}`}
                >
                  <img src={url} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter">{car.company} {car.model}</h3>
              <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                {car.bodyType}
              </span>
            </div>
            
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
              {car.fuelType} Architecture • {car.seats} Seater
            </p>
            
            <div className="flex flex-wrap gap-2 mb-auto">
              {car.environmentFit.map(env => (
                <span key={env} className="text-[9px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100 font-black uppercase tracking-wider">
                  {env} READY
                </span>
              ))}
            </div>

            <div className="flex justify-between items-end border-t border-slate-100 pt-6 mt-6">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Indicative Pricing</p>
                <p className="text-xl font-black text-green-600">
                  ₹{(car.priceRange[0] / 100000).toFixed(1)}L - ₹{(car.priceRange[1] / 100000).toFixed(1)}L
                </p>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Trend</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${car.demandLevel === 'High' ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-500'}`}>
                  {car.demandLevel === 'High' ? '🔥 HIGH DEMAND' : 'MODERATE'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Face (AI Explanations) */}
        <div className="card-back bg-slate-900 text-white rounded-3xl p-8 flex flex-col border border-slate-800 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-black tracking-tight">STRATEGIC FIT</h3>
          </div>

          <div className="flex-1 space-y-4">
            {explanations.map((reason, idx) => (
              <div key={idx} className="flex gap-4 items-start group/reason">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 group-hover/reason:scale-150 transition-transform flex-shrink-0" />
                <p className="text-sm text-slate-400 font-medium leading-relaxed group-hover/reason:text-slate-200 transition-colors">{reason}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">
              <div className="flex flex-col gap-1">
                <span>Resale Rating</span>
                <span className="text-white text-sm">{car.resaleRating} / 5</span>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span>Segment</span>
                <span className="text-white text-sm">{car.bodyType}</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95">
              Analyze Market Availability
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
