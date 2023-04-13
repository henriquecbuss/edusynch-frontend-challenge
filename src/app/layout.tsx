import clsx from 'clsx'
import './globals.css'
import { Roboto } from 'next/font/google'
import Footer from '@/components/Footer'
import { ModalContextProvider } from '@/context/modalContext'
import SignUpModal from '@/components/SignUpModal'
import SignInModal from '@/components/SignInModal'
import { ClerkProvider } from '@clerk/nextjs/app-beta'
import AddCryptoModal from '@/components/AddCryptoModal'
import { assetsWithBrlRates } from '@/utils/coinapi'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'CoinSynch',
  description: 'CoinSynch is a cryptocurrency portfolio tracker.',
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const assets = await assetsWithBrlRates()

  return (
    <html
      lang="en"
      className={clsx(
        roboto.className,
        'text-body text-base font-normal scroll-smooth h-full'
      )}
    >
      <ClerkProvider>
        <ModalContextProvider>
          <body className="h-full">
            <div className="h-full flex flex-col justify-between">
              <div className="">{children}</div>

              <Footer />
            </div>

            <SignInModal />
            <SignUpModal />
            <AddCryptoModal availableAssets={assets} />
          </body>
        </ModalContextProvider>
      </ClerkProvider>
    </html>
  )
}

export default RootLayout
