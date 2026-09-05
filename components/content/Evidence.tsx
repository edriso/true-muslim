import { getAyah, getHadith } from '@/lib/content';
import { arabicReference } from '@/lib/format';
import { ArrowUpLeft } from 'lucide-react';

export function Ayah({
  reference,
  compact = false,
}: {
  reference: string;
  compact?: boolean;
}) {
  const verse = getAyah(reference);
  return (
    <figure className={`evidence ayah ${compact ? 'compact' : ''}`}>
      <span className="eyebrow">من القرآن الكريم</span>
      <blockquote className="quran">{verse.text}</blockquote>
      <figcaption>
        <a href={verse.url}>
          سورة {verse.surahName} · الآية {arabicReference(verse.ayah)}{' '}
          <ArrowUpLeft size={15} aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}
export function Hadith({ id }: { id: string }) {
  const record = getHadith(id);
  return (
    <figure className="evidence hadith">
      <span className="eyebrow">
        {record.excerpt ? 'مقتطف من حديث صحيح' : 'حديث صحيح'}
      </span>
      <p className="attribution">
        {'attribution' in record
          ? record.attribution
          : 'قال رسول الله صلى الله عليه وسلم:'}
      </p>
      <blockquote>{record.text}</blockquote>
      <figcaption>
        <a href={record.url}>
          صحيح {record.collection} · <bdi>{arabicReference(record.number)}</bdi>{' '}
          <ArrowUpLeft size={15} aria-hidden="true" />
        </a>
        <span>
          {record.book} · الراوي: {record.narrator} {record.honorific}
        </span>
      </figcaption>
    </figure>
  );
}
