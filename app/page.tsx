import Hero from '../components/Hero'
import Bio from '../components/Bio'
import MusicSection from '../components/MusicSection'
import Gallery from '../components/Gallery'
import Merch from '../components/Merch'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Videos from '../components/Videos'

export default function Home() {
  return (
    <>
      <Hero />
      <Bio />
      <MusicSection />
      <Videos />
      <Merch />
      <Gallery />
      <Contact />
      <Footer />
    </>
  )
}
