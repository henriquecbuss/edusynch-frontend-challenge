import SignedInHeader from '@/components/SignedInHeader'
import Icons from '@/components/Icons'
import clsx from 'clsx'
import { Asset, assetsWithBrlRates } from '@/utils/coinapi'
import Image from 'next/image'
import FormattedNumber from '@/components/FormattedNumber'
import Card from './Card'
import DailyVariationCard from './DailyVariationCard'

const Dashboard = async () => {
  const assets = await assetsWithBrlRates()

  return (
    <>
      <SignedInHeader />
      <main className="container mt-6">
        <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:gap-8">
          <Balance />
          <div className="flex w-full gap-4 md:gap-8">
            <DailyVariationCard asset={assets[0]} />
            <News />
          </div>
        </div>
      </main>
    </>
  )
}

const Balance = () => {
  return (
    <Card className="flex w-full">
      <div className="flex items-center gap-2 bg-white w-1/2 py-2 px-4 md:gap-4">
        <Icons.Balance className="bg-primary-100 rounded-full w-8 h-8 p-1.5 md:p-[9px] md:w-12 md:h-12 lg:w-16 lg:h-16 lg:p-3" />

        <div className="flex flex-col items-start md:hidden">
          <span className="text-label">Balance</span>
          <span className="text-small-label text-secondary-500">in US$</span>
        </div>
        <div className="hidden md:flex flex-col">
          <span className="text-h5 lg:text-h4">Balance in US$</span>
          <span className="text-label text-secondary lg:text-base">
            (approximately)
          </span>
        </div>
      </div>
      <div className="w-1/2 bg-primary-100 font-bold flex items-center justify-center py-2 px-4 md:text-h4 md:font-bold lg:text-h3">
        $32,256.56
      </div>
    </Card>
  )
}

const News = () => {
  return (
    <Card className="w-1/2 flex flex-col md:flex-row">
      <div className="p-2 md:p-4">
        <span className="text-small-label font-bold md:text-label">
          NFT NEWS
        </span>
        <p className="text-small-label text-secondary-500 mt-[7px] md:mt-[5px]">
          New ElephantX NFT to be launched!
        </p>
        <p className="hidden md:inline-block mt-4 text-small-label text-primary-400 hover:underline cursor-pointer">
          Read more +
        </p>
      </div>
      <div className="w-full min-h-[77px] mt-2 bg-gradient-to-tr from-primary to-quaternary-400 md:mt-0" />
    </Card>
  )
}

export default Dashboard
