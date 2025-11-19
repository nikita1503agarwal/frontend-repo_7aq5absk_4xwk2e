import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Booking from './components/Booking'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <Hero />
      <Services />
      <Booking />
      <footer className="py-12 text-center text-sm text-slate-400">Built with love • Delightful UX • Glass morphic vibes</footer>
    </div>
  )
}

export default App
