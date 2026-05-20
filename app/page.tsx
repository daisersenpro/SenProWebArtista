import Hero from '../components/Hero'
import Bio from '../components/Bio'
import MusicSection from '../components/MusicSection'
import Gallery from '../components/Gallery'
import Merch from '../components/Merch'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Bio />
      <MusicSection />
      <section id="videos" className="py-24 bg-black/40">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6">Video destacado</h2>
          <p className="text-gray-400">Preview YouTube — en construcción</p>
        </div>
      </section>
      <Merch />
      <Gallery />
      <Contact />
      <Footer />
    </>
  )
}
