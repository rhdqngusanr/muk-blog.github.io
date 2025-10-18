import Header from '../../components/Header';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import type { PostMeta } from '../../components/PostCard';

export default async function ClassesPage() {
  const postsPath = path.join(process.cwd(), 'public', 'posts', 'posts.json');
  let allPosts: PostMeta[] = [];
  try {
    const buf = await fs.readFile(postsPath, 'utf-8');
    const data = JSON.parse(buf);
    allPosts = data.posts || [];
  } catch (e) {
    allPosts = [];
  }

  const classPosts = allPosts
    .filter(p => p.category === '아이온2' && p.slug.endsWith('-skills'))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

  const rows = classPosts.map(p => {
    const date = new Date(p.date);
    const d = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    return { ...p, d, tag: p.tags[0] || '' };
  });

  return (
    <>
      <Header />
      <main className="container">
        <section className="section">
          <div className="section-header">
            <h2>직업 정보 모음 <span className="muted">(AI 자동 정리)</span></h2>
            <span className="muted">한 줄 리스트 · {rows.length}개</span>
          </div>
          <ul className="class-list">
            {rows.length === 0 && (<li className="muted" style={{ padding: '12px' }}>직업 스킬 포스트가 아직 없습니다.</li>)}
            {rows.map(p => (
              <li key={p.slug}>
                <Link href={`/posts/${p.slug}`} className="class-item">
                  <span className="class-thumb" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${prefix}${p.cover}`} alt="" />
                    <span className="emoji-badge small">{emojiForSlug(p.slug)}</span>
                  </span>
                  <span className="class-title">{p.title}</span>
                  <span className="class-meta">
                    <span className="class-cat">{p.category}</span>
                    <span className="class-sep">•</span>
                    <span className="class-date">{p.d}</span>
                    {p.tag && (<><span className="class-sep">•</span><span className="class-tag">#{p.tag}</span></>)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}