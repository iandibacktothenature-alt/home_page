import { Link } from 'react-router-dom';
import { externalLinks } from '@/mocks/site';

export default function ContactLine() {
  return (
    <section id="contact" className="bg-background-50 px-4 md:px-8 py-14 md:py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto rounded-3xl border border-background-200 bg-background-100 px-5 py-10 md:px-12 md:py-14 text-center">
        <p className="text-sm tracking-widest text-accent-600">お問い合わせ</p>
        <h2 className="mt-3 font-heading text-2xl md:text-3xl font-bold text-foreground-950 leading-snug">
          お問い合わせはアヤナイの公式LINEへ
        </h2>
        <p className="mt-4 text-sm md:text-base text-foreground-600 leading-loose max-w-xl mx-auto">
          企画の申込み、見学のご相談、アクセスや持ち物のご質問など、お気軽にメッセージをお送りください。各企画に専用の申込み先がある場合は、その案内をご利用ください。
        </p>
        <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
          {externalLinks.line && (
            <a
              href={externalLinks.line}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 hover:bg-primary-700 text-background-50 px-7 py-4 font-bold whitespace-nowrap cursor-pointer transition-colors"
            >
              <span className="w-5 h-5 flex items-center justify-center text-lg"><i className="ri-line-fill" /></span>
              公式LINEで問い合わせる
            </a>
          )}
          <Link
            to="/schedule"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-background-300 hover:bg-background-50 text-foreground-800 px-6 py-4 text-sm whitespace-nowrap cursor-pointer transition-colors"
          >
            予定帖を見る<i className="ri-arrow-right-line" />
          </Link>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-x-6 gap-y-2 text-sm">
          <Link to="/schedule" className="text-foreground-700 hover:text-primary-700 cursor-pointer whitespace-nowrap">アヤナイの予定帖</Link>
          <a href={externalLinks.note} target="_blank" rel="noopener noreferrer" className="text-foreground-700 hover:text-primary-700 cursor-pointer whitespace-nowrap">アヤナイの日記帖（note）</a>
          {externalLinks.instagram && (
            <a href={externalLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-foreground-700 hover:text-primary-700 cursor-pointer whitespace-nowrap">Instagram</a>
          )}
        </div>
      </div>
    </section>
  );
}