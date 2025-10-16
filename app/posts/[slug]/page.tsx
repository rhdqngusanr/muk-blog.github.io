import fs from 'fs/promises';
import path from 'path';
import type { Metadata } from 'next';

interface PostMeta { slug: string; title: string; excerpt: string; date: string; category: string; tags: string[]; cover: string; source?: string; }

export async function generateStaticParams() {
  const metaPath = path.join(process.cwd(), 'public', 'posts', 'posts.json');
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf-8')) as { posts: PostMeta[] };
  return meta.posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const metaPath = path.join(process.cwd(), 'public', 'posts', 'posts.json');
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf-8')) as { posts: PostMeta[] };
  const { slug } = await props.params;
  const p = meta.posts.find(x => x.slug === slug);
  return {
    title: p ? `${p.title} - 재미난사람들` : '포스트 - 재미난사람들',
    description: p?.excerpt,
  };
}

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

  return (
    <main className="container">
      <section className="section">
        <h1 className="post-title">{p?.title ?? '포스트'}</h1>
        <div className="post-meta muted">{p ? `${d} • ${p.category}` : ''}</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {p && (<img src={`${prefix}${p.cover}`} alt="cover" style={{ width: '100%', borderRadius: 12, marginTop: 12, border: '1px solid var(--border)' }} />)}
      {p && (
        <div className="source muted" style={{ marginTop: 8 }}>
          <span className="source-label">출처</span>: <span className="source-value">{p.source ?? '수레나 선생님'}</span>
        </div>
      )}
        <article className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </main>
  );
}