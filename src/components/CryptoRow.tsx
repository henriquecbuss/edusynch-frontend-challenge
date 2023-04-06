'use client'

import clsx from 'clsx'
import Button from './Button'
import FormattedNumber from './FormattedNumber'
import { CryptoCurrency } from '@/cryptoCurrency'
import Image from 'next/image'

const CryptoRow = ({
  crypto,
  index,
}: {
  crypto: CryptoCurrency
  index: number
}) => {
  return (
    <tr className="even:bg-secondary-100 hover:bg-secondary-100 even:hover:bg-secondary-200 transition-colors">
      <Cell>{index}</Cell>
      <Cell className="flex items-center gap-2">
        <Image src={crypto.image} alt="" width={32} height={32} />
        <p className="text-small-label">
          {crypto.name} <span className="text-secondary">{crypto.symbol}</span>
        </p>
      </Cell>
      <Cell>${crypto.price}</Cell>
      <Cell>
        <FormattedNumber
          number={crypto.changePercentage / 100}
          className={clsx({
            'text-tertiary-700': crypto.changePercentage > 0,
            'text-quaternary-700': crypto.changePercentage < 0,
          })}
          options={{
            signDisplay: 'always',
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }}
        />
      </Cell>
      <Cell>
        <Button className="bg-tertiary-700 hover:bg-tertiary-600 active:bg-tertiary-800 focus-visible:ring-primary">
          Buy
        </Button>
      </Cell>
    </tr>
  )
}

const Cell = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <td className={clsx('py-4 px-6', className)}>{children}</td>
}

export default CryptoRow
