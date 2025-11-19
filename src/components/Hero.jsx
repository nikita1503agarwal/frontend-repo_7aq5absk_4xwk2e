import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 grid lg:grid-cols-2 items-center gap-12">
        <div className="backdrop-blur-sm/0">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-300/80 bg-white/5 border border-white/10 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live booking demo
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Your personal appointment engine
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400"> for consultancy & SaaS</span>
          </h1>
          <p className="mt-5 text-lg text-slate-300/90 max-w-xl">
            Offer multiple services, share a clean booking page, and let clients pick a time that works. Modern, glass-morphic feel with delightful motion.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#book" className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold shadow-lg shadow-emerald-500/25 transition">Book a slot</a>
            <a href="#services" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold transition">Explore services</a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/50 to-slate-950"></div>
    </section>
  )
}
