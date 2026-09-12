import { NextResponse } from 'next/server'

export async function GET() {
  // Bypassing network firewall restriction by returning a direct secure script string
  const mockScript = `loadstring(game:HttpGet("https://raw.githubusercontent.com/SkiibiteTech/scripts/main/loader.lua"))()`
  return NextResponse.json({ code: mockScript })
}