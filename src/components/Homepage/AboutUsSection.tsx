import Icons from "@/components/Icons";
import SignUpButton from "@/components/SignUpButton";

const AboutUs = () => {
  return (
    <div className="from-white to-secondary-100 lg:bg-gradient-to-b">
      <section className="mt-14 flex flex-col lg:container md:mt-20 lg:flex-row-reverse lg:gap-8">
        <div className="container lg:mx-0 lg:w-[406px] lg:max-w-none lg:flex-shrink-0 lg:self-center lg:px-0">
          <div className="md:ml-[88px] lg:ml-0">
            <h2 className="font-bold text-primary lg:text-h5" id="about-us">
              About us
            </h2>
            <p className="mt-1 text-h4 font-bold md:text-h3 lg:text-h2">
              Lorem ipsum
            </p>
            <p className="mt-4 text-label lg:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
              urna, porttitor
            </p>

            <SignUpButton className="mt-10 hidden w-44 py-3 text-base lg:block">
              Sign up now
            </SignUpButton>
          </div>
        </div>

        <div className="container mt-6 flex items-center gap-4 overflow-x-scroll bg-gradient-to-b from-white to-secondary-100 pb-14 pt-[11px] md:mt-10 md:flex-col md:items-start md:gap-6 md:pb-20 md:pt-0 lg:mx-0 lg:max-w-none lg:overflow-visible lg:bg-transparent lg:px-0">
          <div className="flex gap-4 md:gap-6 lg:gap-8">
            <AboutUsCard
              title="For your company"
              subtitle="Crypto solutions"
              icon={<Icons.CryptoCurrency />}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam,
            </AboutUsCard>

            <AboutUsCard
              title="For your company"
              subtitle="Crypto solutions"
              icon={<Icons.CryptoCurrencyCircle />}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam,
            </AboutUsCard>
          </div>

          <div className="flex gap-4 md:gap-6 md:self-end lg:gap-8">
            <AboutUsCard
              title="For your company"
              subtitle="Crypto solutions"
              icon={<Icons.Chart />}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam,
            </AboutUsCard>

            <AboutUsCard
              title="For your company"
              subtitle="Crypto solutions"
              icon={<Icons.Computer />}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam,
            </AboutUsCard>
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutUsCard = ({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-[200px] flex-shrink-0 rounded-md p-6 shadow-[0px_12px_24px_rgba(0,0,0,0.05)] md:w-[280px]">
      <div className="h-10 w-10 md:h-16 md:w-16">{icon}</div>
      <h3 className="mt-4 text-label font-bold text-primary md:text-base">
        {title}
      </h3>
      <p className="mb-2 text-h5 font-bold md:text-h4">{subtitle}</p>
      <p className="text-label">{children}</p>
    </div>
  );
};

export default AboutUs;
