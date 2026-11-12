import { useState } from 'react';
import type { VoiceItem } from '@/mocks/site';

interface Props {
  voice: VoiceItem;
  className?: string;
}

const CLAMP_LENGTH = 70;

export default function VoiceCard({ voice, className = '' }: Props) {
  const [expanded, setExpanded] = useState(false);
  const isLong = voice.text.length > CLAMP_LENGTH;
  const shownText = isLong && !expanded ? `${voice.text.slice(0, CLAMP_LENGTH)}…` : voice.text;

  return (
    <figure
      className={`rounded-2xl bg-background-50 border border-secondary-200 p-6 md:p-7 flex flex-col ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary-100 text-secondary-900 px-3 py-1 text-[11px] font-bold whitespace-nowrap">
          <i className="ri-leaf-line" />
          {voice.activity}
        </span>
        {voice.sample && (
          <span className="rounded-full border border-secondary-300 px-2 py-0.5 text-[10px] text-foreground-400 whitespace-nowrap">サンプル</span>
        )}
      </div>
      <blockquote className="mt-4 flex-1">
        <p className="font-heading text-foreground-900 leading-loose break-words">「{shownText}」</p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary-700 hover:text-primary-800 underline underline-offset-4 cursor-pointer whitespace-nowrap"
          >
            {expanded ? '閉じる' : '続きを読む'}
            <i className={`text-sm ${expanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
          </button>
        )}
      </blockquote>
      {(voice.name || voice.photo) && (
        <figcaption className="mt-5 flex items-center gap-3 border-t border-secondary-200 pt-4">
          {voice.photo ? (
            <img
              src={voice.photo}
              alt={voice.name ?? '来場者の写真'}
              title={voice.name ?? '来場者の写真'}
              className="w-10 h-10 rounded-full object-cover object-top shrink-0"
            />
          ) : (
            <span className="w-10 h-10 rounded-full bg-secondary-200 text-secondary-900 flex items-center justify-center text-sm font-bold shrink-0">
              <i className="ri-user-smile-line" />
            </span>
          )}
          <span className="text-sm text-foreground-700">{voice.name ?? 'お名前は非公開'}</span>
        </figcaption>
      )}
    </figure>
  );
}