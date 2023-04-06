import Button from '@/components/Button'
import CryptoDisclosure from '@/components/CryptoDisclosure'

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
    <section className="mt-14 container mb-20">
      <h2 className="text-h5 font-bold text-center">Top Cryptos</h2>

      <div className="flex flex-col mt-4">
        {cryptos.map((crypto, index) => (
          <CryptoDisclosure
            crypto={crypto}
            key={index}
            className="even:bg-secondary-100"
          />
        ))}
      </div>

      <Button variant="ghost" className="text-primary mt-4 mx-auto block">
        View more +
      </Button>
    </section>
  )
}

export default TopCryptos
