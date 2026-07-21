import { profile } from '../data/profile'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-7 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
        <p className="font-label text-[11px] tracking-[0.16em] text-muted">
          © {year} {profile.nameEn}. ALL RIGHTS RESERVED.
        </p>
        <p className="font-label text-[11px] tracking-[0.16em] text-muted">
          {profile.location}
        </p>
      </div>
    </footer>
  )
}
