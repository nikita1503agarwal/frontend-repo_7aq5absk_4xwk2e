import { useEffect, useMemo, useState } from 'react'

export default function Booking(){
  const base = import.meta.env.VITE_BACKEND_URL
  const params = useMemo(() => new URLSearchParams(window.location.hash.split('?')[1]||''), [])
  const serviceId = params.get('service')

  const [services, setServices] = useState([])
  const [selected, setSelected] = useState(serviceId || '')
  const [slots, setSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [form, setForm] = useState({name:'', email:'', notes:''})
  const [dateTime, setDateTime] = useState({date:'', start_time:'', end_time:''})
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch(`${base}/api/services`).then(r=>r.json()).then(setServices).catch(console.error)
  }, [base])

  useEffect(() => {
    async function load(){
      if(!selected) return
      setLoadingSlots(true)
      try{
        const res = await fetch(`${base}/api/services/${selected}/slots?days=21`)
        const data = await res.json()
        setSlots(data)
      }catch(e){console.error(e)}
      finally{setLoadingSlots(false)}
    }
    load()
  }, [base, selected])

  async function submit(e){
    e.preventDefault()
    if(!selected || !dateTime.date){ setStatus('Pick a slot first.'); return; }
    setStatus('Booking...')
    try{
      const res = await fetch(`${base}/api/bookings`, {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
          service_id: selected,
          customer_name: form.name,
          email: form.email,
          date: dateTime.date,
          start_time: dateTime.start_time,
          end_time: dateTime.end_time,
          notes: form.notes
        })
      })
      if(!res.ok){
        const err = await res.json().catch(()=>({detail:'Error'}))
        throw new Error(err.detail||'Error')
      }
      setStatus('Booked ✔')
    }catch(err){
      setStatus(err.message)
    }
  }

  return (
    <section id="book" className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Book a slot</h2>
          <p className="text-slate-300/90 mt-2">Choose a service and pick an available time.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-300/80 mb-2">Service</label>
              <select value={selected} onChange={e=>setSelected(e.target.value)} className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2">
                <option value="">Select a service</option>
                {services.map(s=> <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-300/80 mb-2">Pick a time</label>
              {loadingSlots ? (
                <p className="text-slate-400">Loading slots...</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-auto pr-1">
                  {slots.map((slot, i) => (
                    <button key={i} onClick={()=>setDateTime(slot)} className={`text-left px-3 py-2 rounded-lg border ${dateTime.date===slot.date && dateTime.start_time===slot.start_time ? 'bg-emerald-500 text-slate-900 border-emerald-400' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}>
                      <div className="text-xs text-slate-300/80">{slot.date}</div>
                      <div className="font-medium">{slot.start_time} - {slot.end_time}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/5 p-6 h-fit">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm text-slate-300/80 mb-1">Name</label>
              <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2"/>
            </div>
            <div>
              <label className="block text-sm text-slate-300/80 mb-1">Email</label>
              <input type="email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2"/>
            </div>
            <div>
              <label className="block text-sm text-slate-300/80 mb-1">Notes</label>
              <textarea value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-3 py-2" rows={4} />
            </div>
            <div className="rounded-xl bg-slate-900/40 border border-white/10 p-3 text-sm text-slate-300/80">
              {dateTime.date ? (
                <div>
                  <div>Selected: <span className="text-white font-medium">{dateTime.date}</span> at <span className="text-white font-medium">{dateTime.start_time}</span></div>
                </div>
              ) : 'No slot selected yet.'}
            </div>
            <button className="mt-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold">Confirm booking</button>
            {status && <div className="text-sm text-slate-300 mt-2">{status}</div>}
          </div>
        </form>
      </div>
    </section>
  )
}
