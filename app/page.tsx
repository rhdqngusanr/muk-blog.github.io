"use client";
import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import PostCard, { type PostMeta } from './components/PostCard';

export default function Page() {
  const [allPosts, setAllPosts] = useState<PostMeta[]>([]);
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<string>('');
  const teamMembers = useMemo(() => [
    '고강혁','뿡뿡이','도묵','물꼬기','pfc','씹창슥','노래보옷','재미난사람들 수호자',
    '달사모1','달사모2','달사모3','달사모4','달사모5','달사모6','달사모7','달사모8',
    '알로항','바서머하게','도쿄망지회1번대대장','탄생석','묵','건실하게사는사람','효석팸간부서열0위',
    '우주최강귀여워','병장','시바루잠쥐','벌렁','체리','효석쿤','박영배','티토커','흥삼','근이영양증',
    '명철','상규','인캡','누커','루키','aaa','창학','시로','궁성','기상필','건욱','치유성절대안함',
    '경동맥아이유나옴','ㅇㅎㅊ'
  ], []);

  useEffect(() => {
    fetch('/posts/posts.json')
      .then(r => r.json())
      .then(d => setAllPosts(d.posts || []))
      .catch(() => setAllPosts([]));
  }, []);

  const cats = useMemo(() => ['아이온2'], []);
  const posts = useMemo(() => {
    let list = allPosts.slice();
    if (activeCat) list = list.filter(p => p.category === activeCat);
    const q = query.toLowerCase().trim();
    if (q) list = list.filter(p => p.title.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q));
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [allPosts, query, activeCat]);

  return (
    <>
      <Header onSearch={setQuery} />
      <section className="hero" id="home">
        {/* static decorative shapes to evoke the desired feel */}
        <div className="bg-shapes">
          <span className="shape dot-grid" />
          <span className="shape triangle t1" />
          <span className="shape triangle t2" />
          <span className="shape circle c1" />
          <span className="shape diamond d1" />
          <span className="shape square s1" />
          <span className="shape small-dot sd1" />
          <span className="shape small-dot sd2" />
          <span className="shape small-dot sd3" />
        </div>
        <div className="container hero-inner">
          <h1>
            싱글벙글 <span className="accent">재미난사람들</span> 정보 사이트
          </h1>
          <p className="hero-sub">재미난사람들 팀이 경험한 게임 여정과 협동, 단합, 도전, 그리고 해결 과정을 공유합니다.</p>
          <p className="hero-sub">함께 성장하는 게임 커뮤니티를 만들어가요.</p>
          <div className="hero-cta">
            <a href="#posts" className="button primary">최신 포스트 보기</a>
            <a href="#about" className="button">팀 소개</a>
          </div>
        </div>
      </section>

      {/* clean feature cards section */}
      <section className="section">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">⚙️</div>
              <div className="feature-title">게임 정보</div>
              <div className="feature-desc">정확할 수도 아닐 수도 있는 꿀정보로 웃음 장전!</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <div className="feature-title">순수 비난</div>
              <div className="feature-desc">누구도 안 다치는 가벼운 비난으로 사기 업!</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <div className="feature-title">문제 유발</div>
              <div className="feature-desc">문제가 없으면 우리가 만듭니다. 해결은… 나중에요!</div>
            </div>
          </div>
        </div>
      </section>

      <main className="container">
        <section id="categories" className="section">
          <div className="section-header">
            <h2>카테고리</h2>
            {activeCat && (
              <button className="chip" onClick={() => setActiveCat('')}>필터 해제</button>
            )}
          </div>
          <div className="chips">
            {cats.map(cat => (
              <button key={cat} className={`chip ${activeCat === cat ? 'active' : ''}`} onClick={() => setActiveCat(cat)}>{cat}</button>
            ))}
          </div>
        </section>

        <section id="posts" className="section">
          <div className="section-header">
            <h2>최신 포스트</h2>
            <span className="muted">{posts.length}개 결과</span>
          </div>
          <div className="grid">
            {posts.length === 0 && (<div className="muted">조건에 맞는 포스트가 없습니다.</div>)}
            {posts.map(p => (<PostCard key={p.slug} p={p} />))}
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-header">
            <h2>팀 소개</h2>
            <span className="muted">{teamMembers.length}명</span>
          </div>
          <div className="member-tags">
            {teamMembers.map((name, idx) => (
              <span className={`member-tag color-${idx % 8}`} key={name}>
                <span className="avatar" aria-hidden="true" />
                <span className="name">{name}</span>
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>재미난사람들</strong>
            <div className="muted">© 2025</div>
          </div>
          <div className="muted">GitHub Pages • NVM LTS</div>
        </div>
      </footer>
    </>
  );
}