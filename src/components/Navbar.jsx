import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between rounded-2xl mt-4 bg-white/5 backdrop-blur-lg border border-white/10">
        <a href="#" className="flex items-center gap-2 text-white font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Appointly
        </a>
        <nav className="hidden md:flex items-center gap-6 text-slate-300">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#book" className="hover:text-white">Book</a>
        </nav>
        <button className="md:hidden text-white" onClick={()=>setOpen(!open)}><Menu size={20}/></button>
      </div>
      {open && (
        <div className="md:hidden mx-4 mt-2 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 px-6 py-4 text-slate-300">
          <a href="#services" className="block py-2">Services</a>
          <a href="#book" className="block py-2">Book</a>
        </div>
      )}
    </header>
  )
}
