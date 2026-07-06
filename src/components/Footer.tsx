import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { label: 'Accueil',         href: '/' },
  { label: 'Courses',         href: '/courses' },
  { label: 'Calendrier',      href: '/calendrier' },
  { label: 'Résultats',       href: '/resultats' },
  { label: 'Actualités',      href: '/actualites' },
  { label: 'Infos pratiques', href: '/infos' },
]

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/karukera-logo.jpg"
                alt="Karukera"
                width={40}
                height={40}
                className="rounded-full border border-olive/40"
              />
              <div>
                <p className="text-gold font-heading font-bold text-sm tracking-wider">HIPPODROME</p>
                <p className="text-ivory/50 text-[11px] tracking-widest">DE GUADELOUPE</p>
              </div>
            </div>
            <p className="text-mist text-sm leading-relaxed">
              Association de courses de Guadeloupe — Karukera.<br />
              Vivez la passion du cheval en Guadeloupe.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-ivory font-semibold mb-4 text-sm tracking-wider uppercase">Navigation</h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-mist hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-ivory font-semibold mb-4 text-sm tracking-wider uppercase">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-mist">
              <li>
                <p className="text-ivory/50 text-xs uppercase tracking-wide mb-0.5">Adresse</p>
                <p>Hippodrome de Jarry<br />97122 Baie-Mahault, Guadeloupe</p>
              </li>
              <li>
                <p className="text-ivory/50 text-xs uppercase tracking-wide mb-0.5">Email</p>
                <a href="mailto:contact@demo-tk.fr" className="hover:text-gold transition-colors">
                  contact@demo-tk.fr
                </a>
              </li>
              <li>
                <p className="text-ivory/50 text-xs uppercase tracking-wide mb-0.5">Suivez-nous</p>
                <div className="flex gap-3 mt-1">
                  {['Facebook', 'Instagram'].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="text-xs border border-border hover:border-gold hover:text-gold text-mist px-3 py-1 rounded-full transition-colors"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mist">
          <p>© {new Date().getFullYear()} Hippodrome de Guadeloupe — Karukera. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-gold transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-gold transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
