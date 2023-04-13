import TopCryptos from "@/components/TopCryptos";
import { type Asset } from "@prisma/client";

const TopCryptosSection = ({ assets }: { assets: Asset[] | undefined }) => {
  return (
    <section className="container mt-14">
      <h2
        id="top-cryptos"
        className="text-center text-h5 font-bold md:text-h4 lg:text-h5"
      >
        Top Cryptos
      </h2>

      {assets && <TopCryptos assets={assets} />}
    </section>
  );
};

export default TopCryptosSection;
