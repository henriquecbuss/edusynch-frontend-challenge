import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { api } from "@/utils/api";
import SignedOutHeader from "@/components/SignedOutHeader";
import LandingSection from "@/components/Homepage/LandingSection";
import AboutUs from "@/components/Homepage/AboutUsSection";
import NewsletterSection from "@/components/Homepage/NewsletterSection";
import TopCryptosSection from "@/components/Homepage/TopCryptosSection";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <SignedOutHeader assets={[]} />
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

        <TopCryptosSection />

        <NewsletterSection />
      </main>
    </>
  );
};

export default Home;
