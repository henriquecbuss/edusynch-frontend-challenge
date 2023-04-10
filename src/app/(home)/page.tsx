import Image from 'next/image'
import LandingSection from './LandingSection'
import AboutUs from './AboutUsSection'
import TopCryptos from './TopCryptosSection'
import SignedOutHeader from '@/components/SignedOutHeader'
import NewsletterSection from './NewsletterSection'
import { assetsWithBrlRates } from '@/utils/coinapi'

const Home = async () => {
  const assets = await assetsWithBrlRates()

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
          className="object-cover object-[40%] h-[180px] -mt-16 sm:h-[247px] md:object-[50%] md:mt-0 lg:object-left lg:object-fill lg:w-full"
        />

        <AboutUs />

        {/* @ts-expect-error Async Server Component */}
        <TopCryptos />

        <NewsletterSection />
      </main>
    </>
  )
}

export default Home
