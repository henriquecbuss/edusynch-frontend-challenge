import clsx from 'clsx'
import './globals.css'
import { Roboto } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ModalContextProvider } from '@/context/modalContext'
import SignUpModal from '@/components/SignUpModal'
import SignInModal from '@/components/SignInModal'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'CoinSynch',
  description: 'CoinSynch is a cryptocurrency portfolio tracker.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={clsx(
        roboto.className,
        'text-body text-base font-normal scroll-smooth'
      )}
    >
      <body>
        <ModalContextProvider>
          <Header />

          {children}

          <Footer />

          <SignInModal />
          <SignUpModal />
        </ModalContextProvider>
      </body>
    </html>
  )
}

export default RootLayout
