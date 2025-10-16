import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '재미난사람들',
  description: '싱글벙글 재미난사람들 정보 사이트',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}