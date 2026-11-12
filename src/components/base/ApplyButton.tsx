import { Link } from 'react-router-dom';

interface Props {
  url: string | null;
  label: string;
}

// 受付URLが未確定の場合は「受付中」とせず、予定帖へ案内します。
export default function ApplyButton({ url, label }: Props) {
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 hover:bg-primary-700 text-background-50 px-6 py-3 text-sm font-bold whitespace-nowrap cursor-pointer transition-colors">
        {label}<i className="ri-arrow-right-line" />
      </a>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <span className="inline-flex items-center gap-2 rounded-full border border-background-300 bg-background-100 text-foreground-600 px-5 py-3 text-sm whitespace-nowrap">
        <i className="ri-time-line" />{label}の受付先は準備中です
      </span>
      <Link to="/schedule" className="text-sm text-primary-700 underline underline-offset-4 cursor-pointer">日程は予定帖でご確認ください</Link>
    </div>
  );
}