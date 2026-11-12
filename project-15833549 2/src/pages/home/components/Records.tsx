import { externalLinks } from '@/mocks/site';
import { noteArticles, noteFetchedAt, noteSourceUrl } from '@/data/noteArticles';
import type { NoteArticle } from '@/data/noteArticleTypes';

const formatMonthDay = (value: string) => (value ? value.slice(0, 10).replace(/-/g, '.') : '');

function ArticleCard({ article }: { article: NoteArticle }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-2xl overflow-hidden bg-background-100 border border-background-200 flex flex-col hover:-translate-y-1 hover:border-primary-200 transition-all duration-300 cursor-pointer"
    >
      <div className="w-full h-44 md:h-48 bg-background-200 overflow-hidden shrink-0">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            title={`${article.title}｜アヤナイのnote`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl text-primary-500">
            <i className="ri-booklet-line" />
          </div>
        )}
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <time dateTime={article.isoDate} className="text-xs font-bold tracking-wider text-foreground-500">
          {article.date}
        </time>
        <h3 className="mt-2 font-heading text-lg font-bold text-foreground-950 leading-snug line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 text-sm text-foreground-600 leading-relaxed line-clamp-2 flex-1">{article.excerpt}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-700 group-hover:gap-2 transition-all whitespace-nowrap">
          noteで読む<i className="ri-arrow-right-line" />
        </span>
      </div>
    </a>
  );
}

export default function Records() {
  const articles = [...noteArticles]
    .sort((a, b) => (a.isoDate < b.isoDate ? 1 : a.isoDate > b.isoDate ? -1 : 0))
    .slice(0, 3);

  const noteUrl = noteSourceUrl || externalLinks.note;

  return (
    <section id="records" className="bg-background-50 px-4 md:px-8 py-14 md:py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="text-sm tracking-widest text-accent-600">アヤナイの活動風景・実績</p>
            <h2 className="mt-3 font-heading text-2xl md:text-3xl font-bold leading-snug text-foreground-950">
              活動紹介
            </h2>
            <p className="mt-3 text-sm text-foreground-600 leading-relaxed max-w-2xl">
              noteの日記帖に公開された記事を、新しい順に3件表示しています。畑の手入れや古民家の暮らし、イベントの記録を、写真と文章で綴っています。
            </p>
          </div>
          {noteUrl && (
            <a
              href={noteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-foreground-200 bg-background-100 hover:bg-accent-50 hover:border-accent-300 text-foreground-900 px-5 py-3 text-sm font-bold whitespace-nowrap cursor-pointer transition-colors"
            >
              <span className="w-6 h-6 flex items-center justify-center text-lg text-accent-600"><i className="ri-booklet-line" /></span>
              アヤナイのnoteを読む
              <i className="ri-external-link-line text-xs text-foreground-400" />
            </a>
          )}
        </div>

        {articles.length > 0 ? (
          <>
            <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {articles.map((article) => (
                <ArticleCard key={article.url} article={article} />
              ))}
            </div>
            {noteFetchedAt && (
              <p className="mt-5 text-xs text-foreground-400">
                最終更新: {formatMonthDay(noteFetchedAt)}（日本時間／1時間ごとに自動更新）
              </p>
            )}
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-background-300 bg-background-100 px-5 py-7 md:px-7 md:py-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="w-11 h-11 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xl shrink-0">
              <i className="ri-booklet-line" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-bold text-foreground-950">noteの記事はまだありません</p>
              <p className="mt-1 text-sm text-foreground-600 leading-relaxed">
                日記帖に記事が公開されると、ここに見出し画像・タイトル・投稿日が新しい順で自動的に並びます。
              </p>
            </div>
            {noteUrl && (
              <a
                href={noteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-800 hover:bg-primary-900 text-background-50 px-5 py-3 text-sm font-bold whitespace-nowrap cursor-pointer transition-colors"
              >
                noteを開く<i className="ri-external-link-line" />
              </a>
            )}
          </div>
        )}

        <p className="mt-5 text-xs text-foreground-500 leading-relaxed">
          記事と写真は、noteの日記帖に公開された内容をそのままお借りしています。
        </p>
      </div>
    </section>
  );
}