import Button from '@/components/Button'
import Icons from '@/components/Icons'
import clsx from 'clsx'
import Image from 'next/image'

const Home = () => {
  return (
    <main>
      <Landing />
      <Image
        src="/waves.svg"
        alt=""
        width={1440}
        height={247}
        className="object-cover object-[40%] h-[180px] -mt-10 sm:h-[247px] sm:object-[50%] md:mt-0"
      />
    </main>
  )
}

const Landing = () => {
  return (
    <section className="mt-14 grid grid-flow-col container">
      <div className="flex flex-shrink-0 text-center flex-col items-center md:max-w-[320px] md:text-left md:items-start">
        <h1 className="font-bold text-h5 text-primary md:text-h3">
          Lorem ipsum dolor sit amet, consectetur
        </h1>
        <p className="text-label mt-2 md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,{' '}
          purus sit amet luctus venenatis, lectus magna fringilla urna,
          porttitor
        </p>
        <Button className="uppercase flex items-center justify-center gap-2 mx-auto mt-6 w-[180px] md:mx-0 md:py-3 md:w-[232px]">
          Sign up now <Icons.ArrowRight />
        </Button>

        <ul className="flex items-center gap-4 mt-6 md:mt-10 md:gap-6">
          <Tag>Cryptos</Tag>
          <Tag>NFTs</Tag>
          <Tag>Games</Tag>
        </ul>
      </div>
      <Carrousel />
    </section>
  )
}

const Carrousel = () => {
  // TODO - Nail this down
  return (
    <div className="hidden md:flex flex-shrink-0 flex-grow-0 self-start opacity-mask -mr-[48px] lg:-mr-[112px]">
      <div className="flex flex-grow-0 gap-[67px] px-[71px] lg:px-[98px] lg:gap-[120px] overflow-scroll">
        <CarrouselItem>
          <div className="bg-primary absolute right-0 bottom-0 w-[151px] h-[236px]"></div>
          <CarrouselIcon className="left-[-22px] top-[44px] lg:-left-10 lg:top-[79px]">
            <Icons.CryptoCurrency />
          </CarrouselIcon>
          <CarrouselIcon className="right-[-22px] bottom-[57px] lg:-right-10 lg:top-[318px]">
            <Icons.Chart />
          </CarrouselIcon>
          <CarrouselImage
            src="/happy-woman-standing-isolated-using-tablet.png"
            alt="Happy woman standing using tablet"
          />
        </CarrouselItem>

        <CarrouselItem>
          <div className="bg-primary absolute inset-y-0 inset-x-10 lg:inset-x-[72px]"></div>
          <CarrouselIcon className="-left-[-22px] top-[78px] lg:-left-10 lg:top-[140px]">
            <Icons.Computer />
          </CarrouselIcon>
          <CarrouselIcon className="-right-[-22px] top-[18px] lg:-right-10 lg:top-[33px]">
            <Icons.CryptoCurrencyCircle />
          </CarrouselIcon>
          <CarrouselImage
            src="/happy-man-using-mobile-phone.png"
            alt="Happy man using mobile phone"
          />
        </CarrouselItem>

        <CarrouselItem>
          <div className="bg-primary absolute top-[18px] right-0 w-[179px] bottom-0"></div>
          <CarrouselIcon className="-left-[-22px] top-[193px] lg:-left-10 lg:top-[344px]">
            <Icons.CryptoCurrency />
          </CarrouselIcon>
          <CarrouselIcon className="-right-[-22px] top-[132px] lg:-right-10 lg:top-[236px]">
            <Icons.Chart />
          </CarrouselIcon>

          <CarrouselImage
            src="/happy-woman-standing-isolated-using-tablet-bw.png"
            alt="Happy woman standing using tablet in black and white"
          />
        </CarrouselItem>
      </div>
    </div>
  )
}

const CarrouselItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative isolate flex-shrink-0" aria-hidden>
      {children}
    </div>
  )
}

const CarrouselIcon = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={clsx(
        'bg-primary-100 rounded-lg shadow-lg p-1 w-11 h-11 absolute z-10 lg:w-20 lg:h-20',
        className
      )}
    >
      {children}
    </div>
  )
}

const CarrouselImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Image
      src={src}
      width={384}
      height={499}
      alt={alt}
      className="isolate z-10 md:w-[215px] md:h-[280px] lg:w-[384px] lg:h-[499px]"
    />
  )
}

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="bg-primary-100 text-primary py-1 px-4 rounded-[4px]">
      {children}
    </li>
  )
}

export default Home
