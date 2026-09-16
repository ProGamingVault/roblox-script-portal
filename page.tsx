'use client';
import { useState, useEffect } from 'react';

export default function ScriptPortal() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const CURRENT_ACTIVE_KEY = "PGV786"; 
  const YOUTUBE_VIDEO_URL = "https://youtu.be/VMjMckT4TLg?si=UG7x5xRNRwCqTvpp"; 

  const scriptsList = [
    {
      id: 1,
      title: "Steal an Egg Script",
      hub: "Fyy Hub",
      code: `loadstring(game:HttpGet("https://fyycommunity.com/"))()`
    }
  ];

  useEffect(() => {
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
    
    const adVerified = sessionStorage.getItem('pgv_ad_verified');
    if (adVerified !== 'true') {
      setErrorMessage('⚠️ You must complete the Linkvertise ad-wall first!');
      return;
    }

    if (inputKey.trim() === CURRENT_ACTIVE_KEY) {
      sessionStorage.setItem('portal_session', 'active');
      sessionStorage.setItem('active_key', CURRENT_ACTIVE_KEY);
      setIsAuthorized(true);
      setErrorMessage('');
    } else {
      setErrorMessage('❌ Invalid key! Check the video\'s first 30 seconds.');
    }
  };

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#111111] text-white p-4">
        <div className="bg-[#18181b] border border-[#27272a] p-8 rounded-2xl max-w-md w-full text-center shadow-2xl space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-wide">Pro Gaming Vault</h2>
          <p className="text-gray-400 text-xs">
            Enter your key to unlock today's scripts.
          </p>

          <form onSubmit={handleKeyVerify} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your key here..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-center text-sm"
            />
            {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition duration-200 text-sm"
              >
                Verify Key
              </button>

              <a
                href={YOUTUBE_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-3 rounded-xl transition duration-200 text-sm"
                title="Watch first 30 seconds on YouTube to get the key"
              >
                ▶ Get Key
              </a>
            </div>
          </form>

          <p className="text-gray-400 text-[11px] leading-relaxed pt-2">
            Don't have a key? Press the <span className="text-red-400 font-semibold">Get Key</span> button, watch the video for 30 seconds to find today's key, and then enter it here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-purple-500">🎮 Pro Gaming Vault - Script Hub</h1>
          <p className="text-gray-400 text-xs">All scripts are successfully unlocked for your session.</p>
        </div>

        <div className="space-y-4">
          {scriptsList.map((item, index) => (
            <div key={item.id} className="bg-[#18181b] border border-[#27272a] p-5 rounded-2xl space-y-3 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <span className="text-xs bg-purple-950 text-purple-300 border border-purple-800 px-3 py-1 rounded-full w-fit">
                  {item.hub}
                </span>
              </div>

              <div className="bg-[#09090b] border border-[#27272a] p-3 rounded-xl overflow-x-auto text-xs text-green-400 font-mono">
                {item.code}
              </div>

              <button
                onClick={() => handleCopy(item.code, index)}
                className={`w-full font-medium py-2.5 rounded-xl transition-all duration-200 text-xs ${
                  copiedIndex === index 
                    ? 'bg-green-600 text-white scale-[0.98]' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {copiedIndex === index ? '✓ Copied to Clipboard!' : `Copy ${item.title} Code`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}