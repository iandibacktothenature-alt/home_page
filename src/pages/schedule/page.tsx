import PageLayout from '@/components/feature/PageLayout';
import PageHero from '@/components/base/PageHero';
import { externalLinks } from '@/mocks/site';

export default function Schedule() {
  return (
    <PageLayout>
      <PageHero
        label="スケジュール"
        title="アヤナイの予定帖"
        lines={['農園の見学・体験、イベント、撮影会、事業者交流会など', '開催日と募集状況をご確認いただけます。']}
      />
      <section className="px-4 md:px-8 py-10 md:py-14 max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden border border-background-200 bg-background-50 w-full h-[560px] md:h-[720px]">
          <iframe
            src={externalLinks.timetreeEmbed}
            title="アヤナイの予定帖（TimeTree）"
            className="w-full h-full"
          />
        </div>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-foreground-600">カレンダーが表示されない場合は、TimeTreeで直接ご覧ください。各企画の詳細と申込先は、確定した企画ごとにご案内します。</p>
          <a href={externalLinks.timetree} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 hover:bg-primary-700 text-background-50 px-6 py-3 text-sm font-bold whitespace-nowrap cursor-pointer">
            TimeTreeで開く<i className="ri-external-link-line" />
          </a>
        </div>
      </section>
    </PageLayout>
  );
}