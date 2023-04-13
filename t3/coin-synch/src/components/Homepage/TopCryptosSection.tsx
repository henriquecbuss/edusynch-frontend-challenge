import TopCryptos from "@/components/TopCryptos";
import { assetsWithBrlRates } from "@/utils/coinapi";

const TopCryptosSection = () => {
  // const assets = await assetsWithBrlRates()

  return (
    <section className="container mt-14">
      <h2
        id="top-cryptos"
        className="text-center text-h5 font-bold md:text-h4 lg:text-h5"
      >
        Top Cryptos
      </h2>

      <TopCryptos assets={[]} />
    </section>
  );
};

export default TopCryptosSection;
