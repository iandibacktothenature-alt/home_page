import { Link } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';
import PageHero from '@/components/base/PageHero';
import { externalLinks } from '@/mocks/site';

const topics = [
  '農園の見学・体験について',
  '季節のイベントの申込み・空き状況',
  '家族撮影会の日程と相談',
  'アクセス・集合場所・駐車場について',
  '古民家交流会・共同企画のご相談',
];

export default function Contact() {
  return (
    <PageLayout>
      <PageHero
        label="お問い合わせ"
        title="お問い合わせはアヤナイの公式LINEへ"
        lines={['企画の申込み、見学のご相談、アクセスのご質問など', 'お気軽にメッセージをお送りください。']}
      />
      <section className="px-4 md:px-8 py-12 md:py-16 max-w-4xl mx-auto">
        <div className="rounded-3xl border border-background-200 bg-background-100 p-6 md:p-10">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground-950">公式LINEで問い合わせる</h2>
          <p className="mt-3 text-sm md:text-base text-foreground-600 leading-loose">
            各企画に専用の申込み先が設定されている場合は、その案内をご利用ください。それ以外のご相談は公式LINEで承ります。
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-foreground-700">
            {topics.map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="w-5 h-5 flex items-center justify-center text-primary-600 shrink-0"><i className="ri-check-line" /></span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
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
              to="/#access"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-background-300 hover:bg-background-50 text-foreground-800 px-6 py-4 text-sm whitespace-nowrap cursor-pointer transition-colors"
            >
              アクセス・駐車場を見る<i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-x-6 gap-y-2 text-sm">
          <Link to="/schedule" className="text-foreground-700 hover:text-primary-700 cursor-pointer whitespace-nowrap">アヤナイの予定帖（TimeTree）</Link>
          <a href={externalLinks.note} target="_blank" rel="noopener noreferrer" className="text-foreground-700 hover:text-primary-700 cursor-pointer whitespace-nowrap">アヤナイの日記帖（note）</a>
          {externalLinks.instagram && (
            <a href={externalLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-foreground-700 hover:text-primary-700 cursor-pointer whitespace-nowrap">Instagram</a>
          )}
        </div>
      </section>
    </PageLayout>
  );
}