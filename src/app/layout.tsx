import clsx from 'clsx'
import './globals.css'
import { Roboto } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ModalContextProvider } from '@/context/modalContext'
import SignUpModal from '@/components/SignUpModal'
import SignInModal from '@/components/SignInModal'
import { Asset, assetsWithBrlRates } from '@/utils/coinapi'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'CoinSynch',
  description: 'CoinSynch is a cryptocurrency portfolio tracker.',
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  let assets: Asset[] = [
    {
      id: 'BIT',
      name: 'BITCOIN',
      icon: '/logo.svg',
      priceUsd: 4.67,
      priceBrl: 23.62,
      brlRateChangeAbsolute: 7.082,
      brlRateChangePercentage: 0.1,
    },
    {
      id: 'DOG',
      name: 'DOGECOIN',
      icon: '/logo.svg',
      priceUsd: 4.67,
      priceBrl: 23.62,
      brlRateChangeAbsolute: -5.23,
      brlRateChangePercentage: -0.35,
    },
    {
      id: 'ETH',
      name: 'ETHEREUM',
      icon: '/logo.svg',
      priceUsd: 4.67,
      priceBrl: 23.62,
      brlRateChangeAbsolute: 7.082,
      brlRateChangePercentage: 0.1,
    },
  ]
  // TODO - Bring this back
  // try {
  //   assets = await assetsWithBrlRates()
  // } catch {}

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
          <Header assets={assets} />

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
