import SignedInHeader from "@/components/SignedInHeader";
import Icons from "@/components/Icons";
import Card from "@/components/Dashboard/Card";
import DailyVariationCard from "@/components/Dashboard/DailyVariationCard";
import MyWalletCard from "@/components/Dashboard/MyWalletCard";
import { generateSSGHelper } from "@/server/helpers/ssgHelper";
import { type GetStaticProps } from "next";
import { api } from "@/utils/api";
import LoadingPage from "@/components/LoadingPage";
import Footer from "@/components/Footer";
import FormattedNumber from "@/components/FormattedNumber";
import LoadingSpinner from "@/components/LoadingSpinner";

const Dashboard = () => {
  const { data: assets, isLoading } = api.asset.get.useQuery({});

  if (isLoading || !assets || !assets[0]) {
    return <LoadingPage />;
  }

  return (
    <div className="flex h-full flex-col">
      <SignedInHeader />
      <main className="container mb-10 mt-6 flex-grow">
        <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:gap-8">
          <Balance />
          <div className="flex w-full gap-4 md:gap-8">
            <DailyVariationCard asset={assets[0]} />
            <News />
          </div>
        </div>
        <hr className="mt-6 text-secondary-300 md:hidden" />
        <MyWalletCard />
      </main>
      <Footer />
    </div>
  );
};

const Balance = () => {
  const { data: usdBalance } = api.walletEntry.usdBalance.useQuery();

  return (
    <Card className="flex w-full">
      <div className="flex w-1/2 items-center gap-2 bg-white px-4 py-2 md:gap-4">
        <Icons.Balance className="h-8 w-8 rounded-full bg-primary-100 p-1.5 md:h-12 md:w-12 md:p-[9px] lg:h-16 lg:w-16 lg:p-3" />

        <div className="flex flex-col items-start md:hidden">
          <span className="text-label">Balance</span>
          <span className="text-small-label text-secondary-500">in US$</span>
        </div>
        <div className="hidden flex-col md:flex">
          <span className="text-h5 lg:text-h4">Balance in US$</span>
          <span className="text-label text-secondary lg:text-base">
            (approximately)
          </span>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center bg-primary-100 px-4 py-2 font-bold md:text-h4 md:font-bold lg:text-h3">
        {/* $32,256.56 */}
        {!usdBalance && <LoadingSpinner size={32} />}
        {usdBalance && (
          <FormattedNumber
            number={usdBalance}
            options={{
              signDisplay: "never",
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }}
          />
        )}
      </div>
    </Card>
  );
};

const News = () => {
  return (
    <Card className="flex w-1/2 flex-col md:flex-row">
      <div className="p-2 md:p-4">
        <span className="text-small-label font-bold md:text-label">
          NFT NEWS
        </span>
        <p className="mt-[7px] text-small-label text-secondary-500 md:mt-[5px]">
          New ElephantX NFT to be launched!
        </p>
        <p className="mt-4 hidden cursor-pointer text-small-label text-primary-400 hover:underline md:inline-block">
          Read more +
        </p>
      </div>
      <div className="mt-2 min-h-[77px] w-full bg-gradient-to-tr from-primary to-quaternary-400 md:mt-0" />
    </Card>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const ssg = generateSSGHelper();

  await ssg.asset.get.prefetch({});

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default Dashboard;
