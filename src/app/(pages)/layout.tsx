import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="bg-base min-h-screen pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}
