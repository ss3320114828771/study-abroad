export default function Features() {
  const features = [
    { icon: '🎓', title: 'Expert Counseling', desc: 'Personalized guidance from experienced counselors' },
    { icon: '🌍', title: 'Top Universities', desc: 'Partnerships with 500+ global institutions' },
    { icon: '📚', title: 'Study Resources', desc: 'Premium books, courses, and materials' },
    { icon: '✍️', title: 'Visa Assistance', desc: 'End-to-end visa application support' },
    { icon: '🏠', title: 'Accommodation', desc: 'Help finding safe student housing' },
    { icon: '💼', title: 'Career Guidance', desc: 'Job placement and internship support' },
  ]

  return (
    <section className="py-12">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        Why Choose{' '}
        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Us?
        </span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:scale-105 transition-all"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}