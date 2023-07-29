import './globals.css'

import { type ReactNode } from 'react'
import { type Metadata } from 'next'
import { Foldit, Nunito_Sans } from 'next/font/google'
import LocalFont from 'next/font/local'
import Script from 'next/script'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: {
    default: 'luisfilipept.com',
    template: '%s | luisfilipept.com',
  },
  description: 'Staff engineer at xgeeks.io and open source contributor',
  openGraph: {
    title: 'luisfilipept.com',
    description: 'Staff engineer at xgeeks.io and open source contributor',
    url: 'https://luisfilipept.com',
    siteName: 'luisfilipept.com',
    images: [
      {
        url: 'https://luisfilipept.com/og.png',
        width: 1200,
        height: 628,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    site: 'https://luisfilipept.com',
    title: 'luisFilipePT',
    card: 'summary_large_image',
    creator: '@_luisFilipePT',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

const nunitoSans = Nunito_Sans({ subsets: ['latin'], display: 'swap' })
const foldit = Foldit({
  subsets: ['latin'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-foldit',
})

const calSans = LocalFont({
  src: '../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans',
  display: 'swap',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        nunitoSans.className,
        calSans.variable,
        foldit.variable,
        'dark'
      )}
    >
      <Script
        src="https://beamanalytics.b-cdn.net/beam.min.js"
        data-token={process.env.BEAM_API_TOKEN}
        async // TODO: replace with strategy? https://nextjs.org/docs/app/api-reference/components/script#props
      />
      <body
        className={cn(
          'bg-black',
          process.env.NODE_ENV === 'development' ? 'debug-screens' : ''
        )}
      >
        {children}
      </body>
    </html>
  )
}
