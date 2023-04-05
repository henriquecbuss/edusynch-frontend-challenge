import clsx from 'clsx'
import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'CoinSynch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(roboto.className, 'text-body text-base font-normal')}
    >
      <body>{children}</body>
    </html>
  )
}
