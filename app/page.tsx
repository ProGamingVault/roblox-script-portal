'use client';
import { useState, useEffect } from 'react';

export default function ScriptPortal() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [scriptKey, setScriptKey] = useState<string>('');
  const [unlocked, setUnlocked] = useState<boolean>(false);

  useEffect(() => {
    // 1. URL search params check karna (Linkvertise return URL mein token hona chahiye)
    const queryParams = new URLSearchParams(window.location.search);
    const adToken = queryParams.get('token'); 

    // 2. SessionStorage check karna taake ek baar ads dekhne ke baad baar baar na dekhne pare
    const localVerified = sessionStorage.getItem('pgv_ad_verified');

    if (adToken === 'verified_pgv_2026' || localVerified === 'true') {
      sessionStorage.setItem('pgv_ad_verified', 'true');
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
    setLoading(false);
  }, []);

  const handleVerifyKey = (e: React.FormEvent) => {
    e.preventDefault();
    // Aap yahan apni key validation logic rakh sakte hain
    if (scriptKey.trim().length > 0) {
      setUnlocked(true);
    } else {
      alert('Please enter a valid key!');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Loading security check...</p>
      </div>
    );
  }

  // Agar user ne ads bypass kiye hain ya direct aaya hai (Ad-Wall Block Screen)
  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <div className="bg-red-950/40 border border-red-600 p-8 rounded-xl max-w-md text-center shadow-2xl">
          <h1 className="text-2xl font-bold text-red-500 mb-3">🚫 Ad-Wall Bypass Detected!</h1>
          <p className="text-gray-300 mb-6">
            You cannot access this portal without watching the official Linkvertise ads. Please complete the steps from our Discord link to generate a valid session.
          </p>
          <a
            href="https://linkvertise.com/your-target-link-here" // Yahan apna Linkvertise target link dalein
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg"
          >
            Go Watch Ads & Unlock Access 🔗
          </a>
        </div>
      </div>
    );
  }

  // Authorized user ke liye Asal Portal Interface
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-2 text-white">Pro Gaming Vault</h2>
        <p className="text-gray-400 text-sm text-center mb-6">Enter your key to unlock today's script.</p>

        {!unlocked ? (
          <form onSubmit={handleVerifyKey} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your key here..."
              value={scriptKey}
              onChange={(e) => setScriptKey(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg"
            >
              Verify Key
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-green-400 text-center tracking-wider uppercase">
              Unlocked Script
            </div>
            <textarea
              readOnly
              value={`loadstring(game:HttpGet("https://raw.githubusercontent.com/SkiibiteTech/scripts/main/loader.lua"))()`}
              className="w-full h-28 bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs font-mono text-gray-300 focus:outline-none resize-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
