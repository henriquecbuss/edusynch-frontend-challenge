import clsx from 'clsx'
import './globals.css'
import { Roboto } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'CoinSynch',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={clsx(roboto.className, 'text-body text-base font-normal')}
    >
      <body>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
