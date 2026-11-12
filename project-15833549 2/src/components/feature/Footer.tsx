import { Link } from 'react-router-dom';
import { navItems, externalLinks } from '@/mocks/site';

export default function Footer() {
  return (
    <footer className="bg-foreground-950 text-background-100">
      <div className="px-4 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Link to="/" className="font-heading text-3xl font-extrabold text-background-50 cursor-pointer">I&amp;I</Link>
          <p className="mt-2 font-heading">古民家ベース アヤナイ</p>
          <p className="mt-3 text-sm text-background-300">千葉県印西市｜畑と火と、みんなでつくる場所</p>
        </div>
        <nav aria-label="フッターメニュー" className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {navItems.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-secondary-300 cursor-pointer whitespace-nowrap">{n.label}</Link>
          ))}
          <Link to="/#access" className="hover:text-secondary-300 cursor-pointer whitespace-nowrap">アクセス・駐車場</Link>
          <Link to="/#news" className="hover:text-secondary-300 cursor-pointer whitespace-nowrap">お知らせ</Link>
          <Link to="/voices" className="hover:text-secondary-300 cursor-pointer whitespace-nowrap">来場者の声</Link>
          <Link to="/#contact" className="hover:text-secondary-300 cursor-pointer whitespace-nowrap">お問い合わせ</Link>
        </nav>
        <div className="text-sm flex flex-col gap-3">
          <Link to="/schedule" className="flex items-center gap-2 hover:text-secondary-300 cursor-pointer">
            <span className="w-5 h-5 flex items-center justify-center"><i className="ri-calendar-2-line" /></span>アヤナイの予定帖
          </Link>
          <a href={externalLinks.note} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary-300 cursor-pointer">
            <span className="w-5 h-5 flex items-center justify-center"><i className="ri-booklet-line" /></span>アヤナイの日記帖（note）
          </a>
          {externalLinks.instagram && (
            <a href={externalLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary-300 cursor-pointer">
              <span className="w-5 h-5 flex items-center justify-center"><i className="ri-instagram-line" /></span>アヤナイのInstagramを見る
            </a>
          )}
          {externalLinks.line && (
            <a href={externalLinks.line} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary-300 cursor-pointer">
              <span className="w-5 h-5 flex items-center justify-center"><i className="ri-line-line" /></span>公式LINEで問い合わせる
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-foreground-800 px-4 md:px-8 py-5 text-xs text-background-400 flex flex-col sm:flex-row justify-between gap-2">
        <span>&copy; I&amp;I古民家ベース アヤナイ</span>
        <span>I&amp;I ＝ 私と私</span>
      </div>
    </footer>
  );
}