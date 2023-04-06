import Button from '@/components/Button'
import CryptoDisclosure from '@/components/CryptoDisclosure'
import CryptoRow from '@/components/CryptoRow'
import clsx from 'clsx'

const cryptos = [
  {
    name: 'Bitcoin',
    image: '/BTC.png',
    symbol: 'BTC',
    price: 25499.52,
    changePercentage: 5.65,
  },
  {
    name: 'Bitcoin',
    image: '/BTC.png',
    symbol: 'BTC',
    price: 25499.52,
    changePercentage: 5.65,
  },
  {
    name: 'Bitcoin',
    image: '/BTC.png',
    symbol: 'BTC',
    price: 25499.52,
    changePercentage: 5.65,
  },
  {
    name: 'Bitcoin',
    image: '/BTC.png',
    symbol: 'BTC',
    price: 25499.52,
    changePercentage: 5.65,
  },
]

const TopCryptos = () => {
  return (
    <section className="mt-14 container">
      <h2 className="font-bold text-center text-h5 md:text-h4 lg:text-h5">
        Top Cryptos
      </h2>

      <div className="flex flex-col mt-4 md:hidden">
        {cryptos.map((crypto, index) => (
          <CryptoDisclosure
            crypto={crypto}
            key={index}
            className="even:bg-secondary-100"
          />
        ))}
      </div>

      <table className="hidden md:table table-auto w-full text-left mt-6">
        <thead>
          <tr>
            <Th className="w-1/12">#</Th>
            <Th className="w-1/3">Crypto</Th>
            <Th className="w-1/3">Price</Th>
            <Th className="w-1/3">Change</Th>
            <Th>Trade</Th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto, index) => (
            // TODO - Change key to crypto symbol
            <CryptoRow crypto={crypto} index={index + 1} key={index} />
          ))}
        </tbody>
      </table>

      <Button variant="ghost" className="text-primary mt-4 mx-auto block">
        View more +
      </Button>
    </section>
  )
}

const Th = ({
  children,
  className,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <th
      className={clsx(
        'py-4 px-6 font-normal text-secondary text-label',
        className
      )}
    >
      {children}
    </th>
  )
}

export default TopCryptos
