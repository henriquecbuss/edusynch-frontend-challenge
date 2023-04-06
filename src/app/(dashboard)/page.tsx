import Image from 'next/image'
import LandingSection from './LandingSection'
import AboutUs from './AboutUsSection'
import TopCryptos from './TopCryptosSection'

const Home = () => {
  return (
    <main>
      <LandingSection />

      <Image
        src="/waves.svg"
        alt=""
        width={1440}
        height={247}
        className="object-cover object-[40%] h-[180px] -mt-16 sm:h-[247px] md:object-[50%] md:mt-0 lg:object-left lg:object-fill lg:w-full"
      />

      <AboutUs />

      <TopCryptos />
    </main>
  )
}

export default Home
