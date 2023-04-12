'use client'

import { Asset } from '@/utils/coinapi'
import Image from 'next/image'
import FormattedNumber from '@/components/FormattedNumber'
import clsx from 'clsx'
import Card from './Card'

const DailyVariationCard = ({ asset }: { asset: Asset }) => {
  return (
    <Card className="w-1/2 flex flex-col md:flex-row">
      <div>
        <span className="text-small-label text-secondary mt-2 mx-2 whitespace-nowrap">
          Daily variation
        </span>
        <div className="flex items-center mx-2 mt-2 gap-4 md:flex-col md:items-start md:gap-2 md:mt-4">
          <div className="flex items-center gap-2">
            <Image
              alt=""
              src={asset.icon}
              width={16}
              height={16}
              className="w-4 h-4 md:w-6 md:h-6"
            />
            <span className="text-small-label md:text-label">{asset.id}</span>
          </div>
          <FormattedNumber
            number={asset.brlRateChangePercentage}
            className={clsx('text-label md:text-base', {
              'text-tertiary-700': asset.brlRateChangePercentage > 0,
              'text-quaternary-700': asset.brlRateChangePercentage < 0,
            })}
            options={{
              signDisplay: 'always',
              style: 'percent',
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }}
          />
        </div>
      </div>
      <div className="bg-gradient-to-b from-primary-300 to-primary-300/0 w-full h-full mt-4 md:mt-0" />
    </Card>
  )
}

export default DailyVariationCard
