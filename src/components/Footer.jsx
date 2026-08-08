import { Heart } from 'lucide-react'
import { profile } from '../data/profile.js'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row">
        <div>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
        <div className="flex items-center gap-1.5">
          Crafted with <Heart size={14} className="fill-violet-500 text-violet-500" /> and too much coffee
        </div>
      </div>
    </footer>
  )
}
