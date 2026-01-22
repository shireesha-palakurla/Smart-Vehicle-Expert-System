
import React, { useState, useRef } from 'react';
import { identifyCarFromImage } from '../services/geminiService';
import { IdentifiedCar } from '../types';

interface ImageUploaderProps {
  onIdentification: (car: IdentifiedCar, base64: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onIdentification }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        processImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await identifyCarFromImage(base64);
      onIdentification(result, base64);
    } catch (err: any) {
      setError("AI analysis failed. Please try a clearer image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-xl border-2 border-dashed border-slate-200">
      <div className="text-center">
        {!image ? (
          <>
            <div className="mb-6 inline-flex p-5 bg-blue-50 text-blue-600 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Snap to Identify</h2>
            <p className="text-slate-500 mb-8">Upload a photo of any car to reveal its specifications, market value, and intelligent insights.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
              >
                Choose Photo
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>
          </>
        ) : (
          <div className="relative">
            <img src={image} alt="Selected" className="w-full max-h-80 object-cover rounded-2xl mb-6 shadow-md" />
            {loading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-bold text-blue-600 animate-pulse">Running Computer Vision AI...</p>
              </div>
            )}
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                {error}
                <button 
                  onClick={() => {setImage(null); setError(null);}} 
                  className="block mt-2 underline font-bold"
                >
                  Try Again
                </button>
              </div>
            )}
            <button 
              onClick={() => {setImage(null); setError(null);}} 
              className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md text-slate-600 hover:text-red-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
