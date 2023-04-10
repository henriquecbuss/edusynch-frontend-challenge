import TopCryptos from '@/components/TopCryptos'
import { assetsWithBrlRates } from '@/utils/coinapi'

const TopCryptosSection = async () => {
  const assets = await assetsWithBrlRates()

  return (
    <section className="mt-14 container">
      <h2
        id="top-cryptos"
        className="font-bold text-center text-h5 md:text-h4 lg:text-h5"
      >
        Top Cryptos
      </h2>

      <TopCryptos assets={assets} />
    </section>
  )
}

export default TopCryptosSection
