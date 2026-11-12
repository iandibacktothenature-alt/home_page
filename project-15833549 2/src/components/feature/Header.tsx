import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navItems, externalLinks } from '@/mocks/site';

export default function Header() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap rounded-full px-3.5 py-2 text-sm transition-colors cursor-pointer ${
      isActive
        ? 'bg-primary-100 text-primary-800 font-bold'
        : 'text-foreground-700 hover:bg-background-100 hover:text-primary-700'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-background-50/90 backdrop-blur-md border-b border-background-200">
      <div className="w-full px-4 md:px-8 h-16 md:h-[72px] flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 cursor-pointer" aria-label="I&I古民家ベース ホームへ">
          <span className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-foreground-950 text-background-50 flex items-center justify-center font-en text-base md:text-lg tracking-normal shrink-0">
            I&amp;I
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-sm md:text-[15px] font-bold text-foreground-950 whitespace-nowrap">古民家ベース アヤナイ</span>
            <span className="font-en text-[10px] text-foreground-500 whitespace-nowrap">Kominka Base</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="メインメニュー">
          {navItems.map((n) => (
            <NavLink key={n.to} to={n.to} end className={linkClass}>
              {n.label}
            </NavLink>
          ))}
          <a
            href={externalLinks.note}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm text-foreground-700 hover:bg-background-100 hover:text-primary-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            日記帖<i className="ri-external-link-line text-xs" />
          </a>
          <Link
            to="/contact"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-accent-500 hover:bg-accent-600 text-foreground-950 px-5 py-2.5 text-sm font-bold whitespace-nowrap cursor-pointer transition-colors"
          >
            ご相談・お申込み<i className="ri-arrow-right-line" />
          </Link>
        </nav>

        <button
          type="button"
          className="lg:hidden w-10 h-10 flex items-center justify-center text-2xl text-foreground-900 cursor-pointer whitespace-nowrap"
          aria-label="メニューを開く"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <i className={open ? 'ri-close-line' : 'ri-menu-line'} />
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-background-200 bg-background-50 px-4 py-4 flex flex-col" aria-label="スマホメニュー">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-3 border-b border-background-100 cursor-pointer ${isActive ? 'text-primary-700 font-bold' : 'text-foreground-800'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <a href={externalLinks.note} target="_blank" rel="noopener noreferrer" className="py-3 text-foreground-800 flex items-center gap-1 cursor-pointer">
            日記帖（note）<i className="ri-external-link-line text-xs" />
          </a>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 text-center rounded-full bg-accent-500 text-foreground-950 py-3 font-bold whitespace-nowrap cursor-pointer"
          >
            ご相談・お申込み
          </Link>
        </nav>
      )}
    </header>
  );
}