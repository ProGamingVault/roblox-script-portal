'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [script, setScript] = useState('')
  const [verified, setVerified] = useState(false)
  const [keyInput, setKeyInput] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function fetchScript() {
      try {
        const res = await fetch('/api/script')
        const result = await res.json()
        if (result.code) {
          setScript(result.code)
        }
      } catch (err) {
        setScript('Error loading script')
      }
    }
    fetchScript()
  }, [])

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple correct key check (Aap ise baad mein change kar sakte hain)
    if (keyInput.trim() === 'SKIIBITE2026') {
      setVerified(true)
      setErrorMsg('')
    } else {
      setErrorMsg('Invalid Key! Try "SKIIBITE2026"')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-6">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl text-center">
        <h1 className="text-2xl font-bold mb-2">Pro Gaming Vault</h1>
        <p className="text-zinc-400 text-sm mb-6">Enter your key to unlock today's script.</p>

        {verified ? (
          <div className="bg-zinc-950 p-4 rounded-xl border border-emerald-500/30">
            <p className="text-xs text-emerald-400 mb-2 font-mono">UNLOCKED SCRIPT</p>
            <textarea 
              readOnly 
              value={script} 
              className="w-full h-32 bg-zinc-900 text-zinc-200 text-xs font-mono p-3 rounded-lg border border-zinc-800 focus:outline-none" 
            />
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your key here..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            {errorMsg && <p className="text-xs text-rose-500">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
            >
              Verify Key
            </button>
          </form>
        )}
      </div>
    </main>
  )
}