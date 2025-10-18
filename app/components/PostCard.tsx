import Link from 'next/link';

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  category: string;
  tags: string[];
  cover: string;
  source?: string;
}

function emojiForSlug(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes('guardian')) return '🛡️';
  if (s.includes('gladiator')) return '⚔️';
  if (s.includes('assassin')) return '🗡️';
  if (s.includes('archer')) return '🏹';
  if (s.includes('cleric')) return '✨';
  if (s.includes('chanter')) return '🎵';
  if (s.includes('sorcerer')) return '🔥';
  if (s.includes('spiritmaster')) return '👻';
  return '🎮';
}

export default function PostCard({ p }: { p: PostMeta }) {
  const date = new Date(p.date);
  const d = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  const repoName = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const repoOwner = process.env.NEXT_PUBLIC_REPO_OWNER || '';
  const isUserSite = repoOwner && repoName === `${repoOwner}.github.io`;
  const prefix = repoName && !isUserSite ? `/${repoName}` : '';
  const emoji = emojiForSlug(p.slug);
  return (
    <article className="card">
      <Link className="thumb" href={`/posts/${p.slug}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${prefix}${p.cover}`} alt={`${p.title} cover`} />
        <span className="emoji-badge" aria-hidden="true">{emoji}</span>
        <span className="category-badge">{p.category}</span>
      </Link>
      <div className="card-body">
        <Link className="card-title" href={`/posts/${p.slug}`}>{p.title}</Link>
        <div className="card-excerpt">{p.excerpt}</div>
        <div className="tag-list">{p.tags.map(t => (<span key={t} className="tag">#{t}</span>))}</div>
        <div className="source muted"><span className="source-label">출처</span>: <span className="source-value">{p.source ?? '수레나 선생님'}</span></div>
        <div className="card-meta">
          <span>{d}</span>
          <Link href={`/posts/${p.slug}`} className="button">읽기</Link>
        </div>
      </div>
    </article>
  );
}