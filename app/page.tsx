'use client';
import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

export default function ScriptPortal() {
  const [verified, setVerified] = useState<boolean>(false);
  const [scriptKey, setScriptKey] = useState<string>('');
  const [unlocked, setUnlocked] = useState<boolean>(false);

  const handleVerifyKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (scriptKey.trim().length > 0) {
      setUnlocked(true);
    } else {
      alert('Please enter a valid key!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl max-w-md w-full shadow-2xl text-center">
        <h2 className="text-2xl font-bold mb-2 text-white">Pro Gaming Vault</h2>
        <p className="text-gray-400 text-sm mb-6">Anti-Bypasser Security Protection</p>

        {!verified ? (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-xs text-yellow-500 font-medium">
              🔒 Please complete human verification to access the script portal.
            </p>
            {/* Cloudflare Turnstile Free Widget */}
            <Turnstile
              siteKey="1x00000000000000000000AA" // Yeh Cloudflare ka test key hai, aap apni free key dal sakte hain baad mein
              onSuccess={() => setVerified(true)}
            />
          </div>
        ) : !unlocked ? (
          <form onSubmit={handleVerifyKey} className="space-y-4">
            <p className="text-xs text-green-400 font-medium mb-2">✅ Verification Passed! Enter your key below.</p>
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
          <div className="space-y-4 text-left">
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
