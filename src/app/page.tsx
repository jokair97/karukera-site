import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProchaineCourse from '@/components/ProchaineCourse'
import Calendrier from '@/components/Calendrier'
import Actualites from '@/components/Actualites'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProchaineCourse />
        <Calendrier />
        <Actualites />
      </main>
      <Footer />
    </>
  )
}
