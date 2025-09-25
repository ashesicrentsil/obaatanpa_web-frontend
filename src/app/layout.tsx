import type { Metadata } from 'next'
import { Poppins, Lora } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Obaatanpa - Maternity Care Platform',
  description: 'Comprehensive maternity care platform for expectant mothers in Ghana',
  keywords: ['maternity', 'pregnancy', 'healthcare', 'Ghana', 'mothers', 'babies'],
  authors: [{ name: 'Obaatanpa Team' }],
  icons: {
    icon: [
      { url: '/images/icons/maternity-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/images/icons/maternity-logo.png',
  },
  // manifest: '/site.webmanifest', // Temporarily disabled to prevent 404 errors
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${lora.variable} font-primary antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
