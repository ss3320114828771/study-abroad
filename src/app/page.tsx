import Bismillah from '@/components/ui/bismilliah'
import Hero from '@/components/home/hero'
import Features from '@/components/home/features'
import Products from '@/components/home/products'
import Testimonials from '@/components/home/testimonials'
import PhotoGallery from '@/components/home/photo-gallery'

export default function HomePage() {
  return (
    <div className="space-y-12">
      <Bismillah />
      <Hero />
      <Features />
      
      {/* Photo Gallery Section - New */}
      <PhotoGallery />
      
      <Products />
      <Testimonials />
    </div>
  )
}