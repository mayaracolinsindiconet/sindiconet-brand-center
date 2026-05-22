import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { BrandNav } from '@/components/layout/BrandNav'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
})

const stackSans = localFont({
  src: [
    { path: '../public/assets/fonts/StackSansHeadline-Regular.ttf',  weight: '400', style: 'normal' },
    { path: '../public/assets/fonts/StackSansHeadline-Medium.ttf',   weight: '500', style: 'normal' },
    { path: '../public/assets/fonts/StackSansHeadline-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../public/assets/fonts/StackSansHeadline-Bold.ttf',     weight: '700', style: 'normal' },
  ],
  variable: '--font-stack-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Síndiconet Brand Center',
  description: 'Guia de identidade visual e assets da marca Síndiconet.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${openSans.variable} ${stackSans.variable}`}>
      <body className="antialiased">
        <BrandNav />
        {children}
      </body>
    </html>
  )
}
