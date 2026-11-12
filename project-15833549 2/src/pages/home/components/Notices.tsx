import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { externalLinks } from '@/mocks/site';
import { instagramHandle, instagramProfileUrl } from '@/data/instagramPosts';

const SNAPWIDGET_EMBED_URL =
  'https://snapwidget.com/embed/b804a6e4-df90-4708-b5d8-7bf6104e4481';

export default function Notices() {
  // SnapWidget の埋め込み用スクリプトを1度だけ読み込む
  useEffect(() => {
    if (document.querySelector('script[data-snapwidget-loader]')) return;
    const script = document.createElement('script');
    script.src = 'https://snapwidget.com/js/snapwidget.js';
    script.async = true;
    script.dataset.snapwidgetLoader = 'true';
    document.body.appendChild(script);
  }, []);

  const profileUrl = instagramProfileUrl || externalLinks.instagramInfo;
  const accountLabel = `@${instagramHandle || 'iandi_inzai_info'}`;

  return (
    <section id="news" className="bg-background-50 px-4 md:px-8 py-14 md:py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="text-sm tracking-widest text-accent-600">アヤナイからのお知らせ</p>
          <h2 className="mt-3 font-heading text-2xl md:text-3xl font-bold leading-snug text-foreground-950">
            お知らせ・最新情報
          </h2>
          <p className="mt-4 text-sm text-foreground-600 leading-relaxed">
            告知用のInstagram（{accountLabel}）の投稿から、新しい順に最新3件を表示しています。写真を押すと、その投稿をInstagramで開けます。開催日や今後の予定全体は、予定帖でご確認ください。
          </p>

          {profileUrl && (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-foreground-200 bg-background-100 hover:bg-accent-50 hover:border-accent-300 text-foreground-900 px-5 py-3 text-sm font-bold whitespace-nowrap cursor-pointer transition-colors"
            >
              <span className="w-5 h-5 flex items-center justify-center text-base text-accent-600">
                <i className="ri-instagram-line" />
              </span>
              {accountLabel} を見る
              <i className="ri-external-link-line text-xs text-foreground-400" />
            </a>
          )}

          <Link
            to="/schedule"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-800 hover:gap-3 transition-all cursor-pointer whitespace-nowrap"
          >
            <span className="w-5 h-5 flex items-center justify-center">
              <i className="ri-calendar-2-line" />
            </span>
            予定帖で日程を見る
            <i className="ri-arrow-right-line" />
          </Link>
        </div>

        <div className="lg:col-span-8 w-full min-w-0">
          <div className="w-full max-w-full overflow-hidden rounded-2xl border border-background-200 bg-background-100 p-2 md:p-3">
            <div className="w-full overflow-hidden rounded-xl bg-background-50">
              <iframe
                src={SNAPWIDGET_EMBED_URL}
                className="snapwidget-widget block w-full max-w-full"
                allowTransparency
                frameBorder="0"
                scrolling="no"
                style={{ border: 'none', overflow: 'hidden', width: '100%', aspectRatio: '930 / 519' }}
                title="Instagramの最新投稿"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-foreground-400">
            最新3件を表示しています（Instagramの投稿にあわせて自動で更新されます）
          </p>
        </div>
      </div>
    </section>
  );
}