import fs from 'fs/promises';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/Header';

interface PostMeta { slug: string; title: string; excerpt: string; date: string; category: string; tags: string[]; cover: string; source?: string; }

export async function generateStaticParams() {
  const metaPath = path.join(process.cwd(), 'public', 'posts', 'posts.json');
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf-8')) as { posts: PostMeta[] };
  return meta.posts.map(p => ({ slug: p.slug }));
}

export const metadata: Metadata = { title: '재미난사람들' };

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const metaPath = path.join(process.cwd(), 'public', 'posts', 'posts.json');
  const { slug } = await props.params;
  const contentPath = path.join(process.cwd(), 'public', 'posts', 'content', `${slug}.html`);
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf-8')) as { posts: PostMeta[] };
  const p = meta.posts.find(x => x.slug === slug);
  const html = await fs.readFile(contentPath, 'utf-8').catch(() => '<p class="muted">콘텐츠를 불러올 수 없습니다.</p>');
  const date = p ? new Date(p.date) : new Date();
  const d = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  const repoName = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const repoOwner = process.env.NEXT_PUBLIC_REPO_OWNER || '';
  const isUserSite = repoOwner && repoName === `${repoOwner}.github.io`;
  const prefix = repoName && !isUserSite ? `/${repoName}` : '';

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

  return (
    <>
      <Header />
      <main className="container">
        <div className="post-toolbar">
          <Link href="/#posts" className="button">목록으로</Link>
          <Link href="/" className="button">홈으로</Link>
        </div>
        <section className="section">
          <h1 className="post-title">{p?.title ?? '포스트'}</h1>
          <div className="post-meta muted">{p ? `${d} • ${p.category}` : ''}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {p && (
            <div className="cover-wrap" style={{ marginTop: 12 }}>
              <img src={`${prefix}${p.cover}`} alt="cover" style={{ width: '100%', borderRadius: 12, border: '1px solid var(--border)' }} />
              <span className="emoji-badge" aria-hidden="true">{emojiForSlug(slug)}</span>
            </div>
          )}
        {p && (
          <div className="source muted" style={{ marginTop: 8 }}>
            <span className="source-label">출처</span>: <span className="source-value">{p.source ?? '수레나 선생님'}</span>
          </div>
        )}
          <article className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
        </section>
      </main>
    </>
  );
}