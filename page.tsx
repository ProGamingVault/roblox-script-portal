'use client';
import { useState, useEffect } from 'react';

export default function ScriptPortal() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Aapki nayi video ki active key
  const CURRENT_ACTIVE_KEY = "PROGAMING2026"; 

  useEffect(() => {
    // Check karein ke aya user ad-wall (verify page) se ho kar aaya hai ya nahi
    const adVerified = sessionStorage.getItem('pgv_ad_verified');
    const sessionToken = sessionStorage.getItem('portal_session');
    const savedKey = sessionStorage.getItem('active_key');

    if (adVerified === 'true' && sessionToken === 'active' && savedKey === CURRENT_ACTIVE_KEY) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  const handleKeyVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sab se pehle check karein ke ad-wall cross ki hai ya nahi
    const adVerified = sessionStorage.getItem('pgv_ad_verified');
    if (adVerified !== 'true') {
      setErrorMessage('⚠️ You must complete the Linkvertise ad-wall first!');
      return;
    }

    // Phir key check karein
    if (inputKey.trim() === CURRENT_ACTIVE_KEY) {
      sessionStorage.setItem('portal_session', 'active');
      sessionStorage.setItem('active_key', CURRENT_ACTIVE_KEY);
      setIsAuthorized(true);
      setErrorMessage('');
    } else {
      setErrorMessage('❌ Invalid key! Check the video\'s first 30 seconds.');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl space-y-4">
          <h2 className="text-xl font-bold text-white">Pro Gaming Vault</h2>
          <p className="text-gray-400 text-sm">
            Complete the ad-wall and enter today's key to unlock the script.
          </p>

          <form onSubmit={handleKeyVerify} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your key here..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-center"
            />
            {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
            
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition duration-200"
            >
              Verify & Unlock Script
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold text-purple-500">🎮 Pro Gaming Vault - Script Portal</h1>
        <p className="text-gray-300">Access Granted! Here is your exclusive script.</p>
        
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-xl font-bold">🔥 Exclusive Script</h2>
          <pre className="bg-black p-4 rounded-xl text-green-400 overflow-x-auto text-sm">
            {`loadstring(game:HttpGet("https://raw.githubusercontent.com/your-repo/main/script.lua"))()`}
          </pre>
        </div>
      </div>
    </div>
  );
}