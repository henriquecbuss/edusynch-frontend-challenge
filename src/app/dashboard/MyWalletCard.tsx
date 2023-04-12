'use client'

import clsx from 'clsx'
import Card from './Card'
import Icons from '@/components/Icons'
import Button from '@/components/Button'

type Props = {
  wallets: Record<string, string>[]
}

const MyWalletCard = ({ wallets }: Props) => {
  return (
    <>
      <Header className="mt-6 md:hidden" />
      <Card className="mt-4 md:mt-8">
        <Header className="hidden md:flex" />
        <hr className="hidden md:flex text-secondary-200" />
        {wallets.length === 0 && (
          <div className="py-10 px-14 flex flex-col items-center justify-center text-center md:py-20">
            <Icons.NoWallets className="h-12 md:h-[68px]" />
            <p className="mt-4 font-bold md:mt-6 md:text-h5">
              Nothing here yet...
            </p>
            <p className="mt-2 text-small-label md:text-label">
              Add a crypto and start earning
            </p>
          </div>
        )}
      </Card>
    </>
  )
}

const Header = ({ className }: { className?: string }) => {
  return (
    <div className={clsx('flex items-center gap-4 md:p-6', className)}>
      <Icons.CryptoWallet className="w-6 h-6 md:w-8 md:h-8" />
      <span className="font-bold text-h5 md:text-h4">My Wallet</span>
      <Button className="w-6 h-6 rounded-full !p-0 ml-auto md:w-auto md:h-auto md:!py-2 md:!px-4">
        <span>+</span>
        <span className="hidden md:inline ml-2">Add crypto</span>
      </Button>
    </div>
  )
}

export default MyWalletCard
