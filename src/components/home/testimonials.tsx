export default function Testimonials() {
  const testimonials = [
    { name: 'Ahmed Khan', country: 'UAE', text: 'Thanks to their guidance, I got into my dream university in Canada!', rating: 5 },
    { name: 'Fatima Ali', country: 'Pakistan', text: 'The consultation services are top-notch. Highly recommended!', rating: 5 },
    { name: 'Omar Hassan', country: 'Egypt', text: 'Their study materials helped me ace my IELTS exam.', rating: 5 },
  ]

  return (
    <section className="py-12">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        Student{' '}
        <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          Testimonials
        </span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>
            <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xl">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="text-white font-bold">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.country}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}