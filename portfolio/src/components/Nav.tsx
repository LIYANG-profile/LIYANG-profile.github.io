import { List, X } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useLocale } from '../i18n/LocaleContext'
import { ui } from '../i18n/ui'
import { LocaleSwitch } from './LocaleSwitch'

const navItemKeys = [
  { href: '#works', id: 'works', label: ui.nav.works },
  { href: '#capabilities', id: 'capabilities', label: ui.nav.capabilities },
  { href: '#about', id: 'about', label: ui.nav.about },
  { href: '#contact', id: 'contact', label: ui.nav.contact },
] as const

export function Nav() {
  const { t } = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const sectionIds = navItemKeys.map((item) => item.id)
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const linkClass = (id: string) =>
    `relative font-label text-[11px] tracking-[0.22em] transition-colors duration-200 ${
      activeId === id ? 'text-ink' : 'text-muted hover:text-ink'
    }`

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/90 backdrop-blur-sm transition-[border-color] duration-200 ${
        scrolled ? 'border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-5 md:px-10 lg:px-14">
        <a href="#top" className="font-label text-base font-semibold tracking-[0.12em]">
          {profile.nameEn}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8" aria-label={t(ui.nav.primaryAria)}>
            {navItemKeys.map((item) => (
              <a key={item.href} href={item.href} className={linkClass(item.id)}>
                {t(item.label)}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-out ${
                    activeId === item.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  aria-hidden
                />
              </a>
            ))}
          </nav>
          <LocaleSwitch />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LocaleSwitch />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-line"
            aria-label={menuOpen ? t(ui.nav.closeMenu) : t(ui.nav.openMenu)}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          className="border-t border-line bg-paper px-5 py-6 md:hidden"
          aria-label={t(ui.nav.mobileAria)}
        >
          <ul className="flex flex-col gap-5">
            {navItemKeys.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`font-label text-sm tracking-[0.2em] ${
                    activeId === item.id ? 'text-accent' : ''
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(item.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
