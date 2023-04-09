import clsx from 'clsx'
import FormattedNumber from './FormattedNumber'
import { Asset } from '@/utils/coinapi'

// TODO - Add auto scroll?

type Props = {
  className?: string
  coins: Asset[]
}

const CoinCarrousel = ({ className, coins }: Props) => {
  return (
    <div
      className={clsx(
        'py-[5px] mx-2 flex items-center gap-6 overflow-scroll scrollbar-hide px-4 coin-carrousel-opacity-mask',
        className
      )}
    >
      {coins.map((coin) => (
        <Coin coin={coin} key={coin.id} />
      ))}
    </div>
  )
}

const Coin = ({ coin }: { coin: Asset }) => {
  return (
    <div className="text-small-label flex items-center gap-2 flex-shrink-0">
      <span className="text-secondary-800">{coin.id}</span>
      <span>
        <FormattedNumber
          number={coin.priceBrl}
          options={{ style: 'currency', currency: 'BRL' }}
        />
      </span>
      <span
        className={clsx({
          'text-tertiary-700': coin.brlRateChangeAbsolute > 0,
          'text-quaternary-700': coin.brlRateChangeAbsolute < 0,
        })}
      >
        <FormattedNumber
          number={coin.brlRateChangeAbsolute}
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
