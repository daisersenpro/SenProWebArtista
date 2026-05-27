import Hero from '../components/Hero'
import Bio from '../components/Bio'
import VideosSection from '../components/VideosSection'
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
      <VideosSection />
      <Merch />
      <Gallery />
      <Contact />
      <Footer />
    </>
  )
}
