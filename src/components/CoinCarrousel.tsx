import clsx from 'clsx'
import { forwardRef } from 'react'
import FormattedNumber from './FormattedNumber'

type Coin = {
  symbol: string
  price: number
  change: number
}

const CoinCarrousel = forwardRef<
  HTMLDivElement,
  { className?: string; coins: Coin[] }
>(({ className, coins }, ref) => {
  return (
    <div className={clsx('py-[5px] overflow-hidden', className)}>
      <div
        className={clsx('mx-2 flex items-center gap-6 overflow-hidden')}
        ref={ref}
      >
        {coins.map((coin) => (
          <Coin coin={coin} key={coin.symbol} />
        ))}
      </div>
    </div>
  )
})
CoinCarrousel.displayName = 'CoinCarrousel'

const Coin = ({ coin }: { coin: Coin }) => {
  return (
    <div className="text-small-label flex items-center gap-2 flex-shrink-0">
      <span className="text-secondary-800">{coin.symbol}</span>
      <span>
        <FormattedNumber
          number={coin.price}
          options={{ style: 'currency', currency: 'BRL' }}
        />
      </span>
      <span
        className={clsx({
          'text-tertiary-700': coin.change > 0,
          'text-quaternary-700': coin.change < 0,
        })}
      >
        <FormattedNumber
          number={coin.change}
          options={{
            signDisplay: 'always',
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          }}
        />
      </span>
    </div>
  )
}

export default CoinCarrousel
