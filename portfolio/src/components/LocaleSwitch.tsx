import { useLocale } from '../i18n/LocaleContext'
import { ui } from '../i18n/ui'

/** 极简 中 / EN，编辑风小字号，不抢导航主层级 */
export function LocaleSwitch({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useLocale()

  return (
    <div
      className={`inline-flex items-center gap-1.5 font-label text-[11px] tracking-[0.18em] ${className}`}
      role="group"
      aria-label={t(ui.localeSwitch.aria)}
    >
      <button
        type="button"
        className={`transition-colors duration-200 ${
          locale === 'zh' ? 'text-ink' : 'text-muted hover:text-ink'
        }`}
        aria-pressed={locale === 'zh'}
        onClick={() => setLocale('zh')}
      >
        中
      </button>
      <span className="text-muted/50" aria-hidden>
        /
      </span>
      <button
        type="button"
        className={`transition-colors duration-200 ${
          locale === 'en' ? 'text-ink' : 'text-muted hover:text-ink'
        }`}
        aria-pressed={locale === 'en'}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
    </div>
  )
}
