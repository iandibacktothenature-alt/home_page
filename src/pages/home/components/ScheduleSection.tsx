import { Link } from 'react-router-dom';
import { externalLinks } from '@/mocks/site';

export default function ScheduleSection() {
  return (
    <section id="schedule" className="bg-background-100 px-4 md:px-8 py-14 md:py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-2">
          <p className="text-sm tracking-widest text-accent-600">アヤナイの予定帖</p>
          <h2 className="mt-3 font-heading text-2xl md:text-3xl font-extrabold leading-snug tracking-tight text-foreground-950">
            古民家のスケジュール
          </h2>
          <p className="mt-4 text-sm text-foreground-600 leading-relaxed">
            農園の見学・体験、季節のイベント、家族撮影会、古民家交流会。それぞれの開催日と受付状況をカレンダーでまとめています。
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              to="/schedule"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 hover:bg-primary-700 text-background-50 px-6 py-3 text-sm font-bold whitespace-nowrap cursor-pointer transition-colors"
            >
              予定帖を開く<i className="ri-arrow-right-line" />
            </Link>
            <a
              href={externalLinks.timetree}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-background-300 hover:bg-background-50 text-foreground-800 px-6 py-3 text-sm whitespace-nowrap cursor-pointer transition-colors"
            >
              TimeTreeで見る<i className="ri-external-link-line" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-3 w-full">
          <div className="rounded-2xl overflow-hidden border border-background-200 bg-background-50 w-full h-[380px] md:h-[480px]">
            <iframe
              src={externalLinks.timetreeEmbed}
              title="アヤナイの予定帖（TimeTree）"
              className="w-full h-full"
            />
          </div>
          <p className="mt-3 text-xs text-foreground-500">
            カレンダーが表示されない場合は、
            <a href={externalLinks.timetree} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-700 cursor-pointer">TimeTreeで直接ご覧ください</a>
            。
          </p>
        </div>
      </div>
    </section>
  );
}