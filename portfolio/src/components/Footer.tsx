import { profile } from '../data/profile'
import { useLocale } from '../i18n/LocaleContext'
import { ui } from '../i18n/ui'

export function Footer() {
  const { locale, t } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-7 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
        <p className="font-label text-[11px] tracking-[0.16em] text-muted">
          {locale === 'zh'
            ? `© ${year} ${profile.nameEn} · ${t(ui.footer.rights)}`
            : `© ${year} ${profile.nameEn}. ${t(ui.footer.rights)}`}
        </p>
        <p className="font-label text-[11px] tracking-[0.16em] text-muted">
          {t(profile.location)}
        </p>
      </div>
    </footer>
  )
}
