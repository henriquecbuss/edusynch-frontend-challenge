import { GetStaticProps, type NextPage } from "next";
import Image from "next/image";

import { api } from "@/utils/api";
import SignedOutHeader from "@/components/SignedOutHeader";
import LandingSection from "@/components/Homepage/LandingSection";
import AboutUs from "@/components/Homepage/AboutUsSection";
import NewsletterSection from "@/components/Homepage/NewsletterSection";
import TopCryptosSection from "@/components/Homepage/TopCryptosSection";
import { generateSSGHelper } from "@/server/helpers/ssgHelper";

const Home: NextPage = () => {
  const { data: assets } = api.asset.get.useQuery({
    limit: 10,
  });

  return (
    <>
      <SignedOutHeader assets={assets} />
      <main>
        <LandingSection />

        <Image
          src="/waves.svg"
          alt=""
          width={1440}
          height={247}
          aria-hidden
          className="-mt-16 h-[180px] object-cover object-[40%] sm:h-[247px] md:mt-0 md:object-[50%] lg:w-full lg:object-fill lg:object-left"
        />

        <AboutUs />

        <TopCryptosSection assets={assets} />

        <NewsletterSection />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  await ssg.asset.get.prefetch({
    limit: 10,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default Home;
