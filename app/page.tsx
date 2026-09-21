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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'SenPro',
            url: 'https://senpro.netlify.app/',
            image: 'https://senpro.netlify.app/images/logo.png',
            jobTitle: 'Rapero y productor musical',
            description:
              'SenPro es un rapero y productor musical de La Reina, Santiago de Chile.',
            homeLocation: {
              '@type': 'Place',
              name: 'La Reina, Santiago de Chile',
            },
            knowsAbout: ['Rap chileno', 'Hip hop', 'Producción musical'],
            sameAs: [
              'https://www.instagram.com/senprodaiser/',
              'https://www.tiktok.com/@senpro_daiser',
            ],
          }),
        }}
      />
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
