import { useEffect, useState } from 'react'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const base = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    async function run(){
      try{
        const res = await fetch(`${base}/api/services`)
        const data = await res.json()
        setServices(data)
      }catch(e){
        console.error(e)
      }finally{
        setLoading(false)
      }
    }
    run()
  }, [base])

  return (
    <section id="services" className="relative py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Services</h2>
          <p className="text-slate-300/90 mt-2">Pick what you need—each maps to its own availability.</p>
        </div>

        {loading ? (
          <p className="text-slate-400">Loading services...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s._id} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition group">
                <div className="flex items-start justify-between">
                  <h3 className="text-white font-semibold text-lg">{s.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-md" style={{background:s.color||'#334155', color:'#0b1220'}}> {s.duration_minutes}m </span>
                </div>
                <p className="text-slate-300/80 mt-2 text-sm min-h-[48px]">{s.description}</p>
                <a href={`#book?service=${s._id}`} className="inline-flex mt-4 text-emerald-400 hover:text-emerald-300">Book now →</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
