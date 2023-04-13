import Icons from "@/components/Icons";
import clsx from "clsx";
import Image from "next/image";
import SignUpButton from "@/components/SignUpButton";

const LandingSection = () => {
  return (
    <section className="container mt-14 grid grid-flow-col">
      <div className="flex flex-shrink-0 flex-col items-center text-center md:max-w-[320px] md:items-start md:text-left">
        <h1 className="text-h5 font-bold text-primary md:text-h3">
          Lorem ipsum dolor sit amet, consectetur
        </h1>
        <p className="mt-2 text-label md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,{" "}
          purus sit amet luctus venenatis, lectus magna fringilla urna,
          porttitor
        </p>
        <SignUpButton className="mx-auto mt-6 flex min-w-[180px] items-center justify-center gap-2 uppercase md:mx-0 md:min-w-[232px] md:py-3">
          Sign up now <Icons.ArrowRight />
        </SignUpButton>

        <ul className="mt-6 flex items-center gap-4 md:mt-10 md:gap-6">
          <Tag>Cryptos</Tag>
          <Tag>NFTs</Tag>
          <Tag>Games</Tag>
        </ul>
      </div>
      <Carrousel />
    </section>
  );
};

const Carrousel = () => {
  // TODO - Nail this down
  return (
    <div className="opacity-mask -mr-[48px] hidden flex-shrink-0 flex-grow-0 self-start md:flex lg:-mr-[112px]">
      <div className="flex flex-grow-0 gap-[67px] overflow-scroll px-[71px] scrollbar-hide lg:gap-[120px] lg:px-[98px]">
        <CarrouselItem>
          <div className="absolute bottom-0 right-0 h-[236px] w-[151px] bg-primary"></div>
          <CarrouselIcon className="left-[-22px] top-[44px] lg:-left-10 lg:top-[79px]">
            <Icons.CryptoCurrency />
          </CarrouselIcon>
          <CarrouselIcon className="bottom-[57px] right-[-22px] lg:-right-10 lg:top-[318px]">
            <Icons.Chart />
          </CarrouselIcon>
          <CarrouselImage
            src="/happy-woman-standing-isolated-using-tablet.png"
            alt="Happy woman standing using tablet"
          />
        </CarrouselItem>

        <CarrouselItem>
          <div className="absolute inset-x-10 inset-y-0 bg-primary lg:inset-x-[72px]"></div>
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
          <div className="absolute bottom-0 right-0 top-[18px] w-[179px] bg-primary"></div>
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
  );
};

const CarrouselItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative isolate flex-shrink-0" aria-hidden>
      {children}
    </div>
  );
};

const CarrouselIcon = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "absolute z-10 h-11 w-11 rounded-lg bg-primary-100 p-1 shadow-lg lg:h-20 lg:w-20",
        className
      )}
    >
      {children}
    </div>
  );
};

const CarrouselImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Image
      src={src}
      width={384}
      height={499}
      alt={alt}
      className="isolate z-10 md:h-[280px] md:w-[215px] lg:h-[499px] lg:w-[384px]"
    />
  );
};

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="rounded-[4px] bg-primary-100 px-4 py-1 text-primary">
      {children}
    </li>
  );
};

export default LandingSection;
