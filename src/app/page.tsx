import Navbar from '@/components/Navbar'
import HeroWrapper from '@/components/HeroWrapper'
import ProchaineCourse from '@/components/ProchaineCourse'
import Calendrier from '@/components/Calendrier'
import Actualites from '@/components/Actualites'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroWrapper />
        <ProchaineCourse />
        <Calendrier />
        <Actualites />
      </main>
      <Footer />
    </>
  )
}
