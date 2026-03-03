import Bismillah from '@/components/ui/bismilliah'

export default function DirectionsPage() {
  const countries = [
    { name: 'USA', flag: '🇺🇸', universities: '200+', students: '1500+', icon: '🗽' },
    { name: 'UK', flag: '🇬🇧', universities: '150+', students: '1200+', icon: '🎓' },
    { name: 'Canada', flag: '🇨🇦', universities: '100+', students: '900+', icon: '🍁' },
    { name: 'Australia', flag: '🇦🇺', universities: '80+', students: '700+', icon: '🦘' },
    { name: 'Germany', flag: '🇩🇪', universities: '120+', students: '600+', icon: '🏰' },
    { name: 'France', flag: '🇫🇷', universities: '90+', students: '500+', icon: '🗼' },
    { name: 'Japan', flag: '🇯🇵', universities: '70+', students: '400+', icon: '🗻' },
    { name: 'UAE', flag: '🇦🇪', universities: '50+', students: '300+', icon: '🏜️' },
  ]

  return (
    <div className="space-y-8">
      <Bismillah />
      
      <h1 className="text-5xl font-bold text-center text-white mb-8">
        Study{' '}
        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Destinations
        </span>
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <div key={country.name} className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:scale-105 transition-all">
            <div className="text-6xl mb-4 group-hover:rotate-12 transition-transform">{country.flag}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{country.name}</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">🎓 {country.universities} Universities</p>
              <p className="text-gray-300">👥 {country.students} Students Placed</p>
              <p className="text-gray-300">📚 Top Programs Available</p>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition-all">
              Explore {country.name}
            </button>
          </div>
        ))}
      </div>

      {/* Map placeholder */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8 mt-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Global Presence</h2>
        <div className="h-64 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center">
          <p className="text-white text-xl">Interactive Map Coming Soon 🌍</p>
        </div>
      </div>
    </div>
  )
}