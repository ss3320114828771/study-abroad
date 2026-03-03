import Bismillah from '@/components/ui/bismilliah'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <Bismillah />
      
      <h1 className="text-5xl font-bold text-center text-white mb-8">
        About{' '}
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Our Agency
        </span>
      </h1>

      {/* Hero Section */}
      <div className="relative h-[400px] rounded-3xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80 z-10"></div>
        <img src="/images/n1.jpeg" alt="About Us" className="w-full h-full object-cover" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h2 className="text-4xl font-bold mb-4">Your Trusted Partner in Global Education</h2>
            <p className="text-xl">10+ Years of Excellence | 5000+ Students Placed | 100+ University Partners</p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-white">Our Story</h3>
          <p className="text-gray-300 text-lg">
            Founded in 2014, we've helped thousands of students achieve their dreams of studying abroad. 
            Our commitment to excellence and personalized guidance sets us apart.
          </p>
          <p className="text-gray-300 text-lg">
            We believe that quality education should be accessible to everyone. Our team of experienced 
            counselors works tirelessly to match students with the perfect programs and universities.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl border border-white/20 text-center">
            <div className="text-4xl font-bold text-white mb-2">10+</div>
            <div className="text-gray-300">Years Experience</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl border border-white/20 text-center">
            <div className="text-4xl font-bold text-white mb-2">5000+</div>
            <div className="text-gray-300">Students Placed</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-2xl border border-white/20 text-center">
            <div className="text-4xl font-bold text-white mb-2">100+</div>
            <div className="text-gray-300">Universities</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-2xl border border-white/20 text-center">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-300">Countries</div>
          </div>
        </div>
      </div>

      {/* Skills & Knowledge Section */}
      <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 rounded-3xl p-8 border border-white/20">
        <h3 className="text-3xl font-bold text-white mb-6 text-center">Importance of Skills & Knowledge</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-5xl mb-4">📚</div>
            <h4 className="text-xl font-bold text-white mb-2">Academic Excellence</h4>
            <p className="text-gray-300">Strong grades and test scores open doors to top universities worldwide.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🗣️</div>
            <h4 className="text-xl font-bold text-white mb-2">Language Proficiency</h4>
            <p className="text-gray-300">Mastering English through IELTS/TOEFL is crucial for success abroad.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🌍</div>
            <h4 className="text-xl font-bold text-white mb-2">Cultural Awareness</h4>
            <p className="text-gray-300">Understanding different cultures helps in adapting to new environments.</p>
          </div>
        </div>
      </div>

      {/* Administrator Info */}
      <div className="text-center py-8">
        <div className="inline-block bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-8 py-4 rounded-2xl border border-white/20">
          <p className="text-sm text-gray-400">Administrator</p>
          <p className="text-2xl font-bold text-white">Hafiz Sajid Syed</p>
          <p className="text-gray-400">sajidsyed@gmail.com | hafiz.sajid.syed@gmail.com</p>
        </div>
      </div>
    </div>
  )
}