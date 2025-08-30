import type { Metadata } from 'next';
import './globals.scss';
import "./styles.scss";
export const metadata: Metadata = {
  title: 'CoreNotes - Suas Anotações em um só lugar',
  description:
    'Uma plataforma para organizar suas anotações de forma eficiente.',
  authors: [
    {
      name: 'Davi Batista',
      url: 'https://github.com/odavibatista',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
