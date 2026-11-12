import { Link } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';
import PageHero from '@/components/base/PageHero';

export default function ComingSoon({ label, title, lines }: { label: string; title: string; lines: string[] }) {
  return (
    <PageLayout>
      <PageHero label={label} title={title} lines={lines} />
      <section className="px-4 md:px-8 py-16 max-w-5xl mx-auto">
        <p className="text-foreground-600">このページは現在準備中です。開催日と募集状況は予定帖をご覧ください。</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link to="/schedule" className="text-center rounded-full bg-primary-600 text-background-50 px-6 py-3 text-sm font-bold whitespace-nowrap cursor-pointer">予定帖を見る</Link>
          <Link to="/" className="text-center rounded-full border border-background-300 px-6 py-3 text-sm whitespace-nowrap cursor-pointer">ホームへ戻る</Link>
        </div>
      </section>
    </PageLayout>
  );
}