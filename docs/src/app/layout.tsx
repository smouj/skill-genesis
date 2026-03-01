import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Skill Genesis — AI Autonomous Skill Generator | OpenClaw Ecosystem',
  description:
    'Skill Genesis generates professional OpenClaw skills in seconds using Kilo AI. Autonomous creation, GitHub publishing, and Telegram notifications — all from a single Python command.',
  keywords: [
    'OpenClaw', 'Skill Genesis', 'AI skill generator', 'Kilo AI', 'automation',
    'Python CLI', 'GitHub automation', 'developer tools', 'skill creation',
    'autonomous agent', 'smouj', 'skill-genesis'
  ],
  authors: [{ name: 'smouj', url: 'https://github.com/smouj' }],
  creator: 'smouj',
  openGraph: {
    title: 'Skill Genesis — AI Autonomous Skill Generator',
    description: 'Create professional OpenClaw skills in seconds with Kilo AI. No config, no boilerplate.',
    url: 'https://smouj.github.io/skill-genesis',
    siteName: 'Skill Genesis',
    images: [
      {
        url: '/skill-genesis/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Skill Genesis — OpenClaw AI Skill Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skill Genesis — AI Autonomous Skill Generator',
    description: 'Create professional OpenClaw skills in seconds with Kilo AI.',
    images: ['/skill-genesis/og-image.svg'],
    creator: '@smouj',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/skill-genesis/favicon.svg',
  },
  metadataBase: new URL('https://smouj.github.io'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
      </body>
    </html>
  )
}
