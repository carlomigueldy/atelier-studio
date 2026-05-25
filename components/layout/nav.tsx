import Link from 'next/link'

const NAV_LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
]

export function Nav() {
  return (
    <nav
      className="flex items-center justify-between px-6 lg:px-[60px] py-7 border-b border-border"
      aria-label="Main navigation"
    >
      <Link href="/" className="font-serif text-xl font-bold text-linen hover:opacity-90 transition-opacity">
        Atelier<span className="text-copper" aria-hidden="true">.</span>
      </Link>

      <ul className="hidden md:flex items-center gap-10 list-none" role="list">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-[13px] text-linen-dim hover:text-linen transition-colors tracking-[0.5px]"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="bg-copper text-bg px-5 py-2.5 text-[12px] font-bold tracking-[1.5px] uppercase rounded-sm hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-focus"
      >
        Start a Project
      </Link>
    </nav>
  )
}
