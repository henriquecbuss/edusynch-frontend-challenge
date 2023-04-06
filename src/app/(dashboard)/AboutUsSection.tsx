import Button from '@/components/Button'
import Icons from '@/components/Icons'

const AboutUs = () => {
  return (
    <section className="mt-14 md:mt-20 flex flex-col lg:flex-row-reverse lg:container lg:gap-8 lg:bg-gradient-to-b from-white to-secondary-100">
      <div className="container lg:self-center lg:max-w-none lg:mx-0 lg:px-0 lg:w-[406px] lg:flex-shrink-0">
        <div className="md:ml-[88px] lg:ml-0">
          <h2 className="text-primary font-bold lg:text-h5" id="about-us">
            About us
          </h2>
          <p className="text-h4 md:text-h3 lg:text-h2 font-bold mt-1">
            Lorem ipsum
          </p>
          <p className="text-label mt-4 lg:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,{' '}
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor
          </p>

          <Button className="hidden lg:block w-44 py-3 text-base mt-10">
            Sign up now
          </Button>
        </div>
      </div>

      <ul className="container flex md:flex-col items-center md:items-start overflow-x-scroll lg:overflow-visible pb-14 md:pb-20 gap-4 md:gap-6 mt-6 pt-[11px] md:pt-0 md:mt-10 bg-gradient-to-b lg:bg-transparent from-white to-secondary-100 lg:max-w-none lg:mx-0 lg:px-0">
        <div className="flex gap-4 md:gap-6 lg:gap-8">
          <AboutUsCard
            title="For your company"
            subtitle="Crypto solutions"
            icon={<Icons.CryptoCurrency />}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          </AboutUsCard>

          <AboutUsCard
            title="For your company"
            subtitle="Crypto solutions"
            icon={<Icons.CryptoCurrencyCircle />}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          </AboutUsCard>
        </div>

        <div className="flex gap-4 md:gap-6 md:self-end lg:gap-8">
          <AboutUsCard
            title="For your company"
            subtitle="Crypto solutions"
            icon={<Icons.Chart />}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          </AboutUsCard>

          <AboutUsCard
            title="For your company"
            subtitle="Crypto solutions"
            icon={<Icons.Computer />}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          </AboutUsCard>
        </div>
      </ul>
    </section>
  )
}

const AboutUsCard = ({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <li className="p-6 rounded-md shadow-[0px_12px_24px_rgba(0,0,0,0.05)] flex-shrink-0 w-[200px] md:w-[280px]">
      <div className="w-10 h-10 md:w-16 md:h-16">{icon}</div>
      <h3 className="font-bold text-label text-primary mt-4 md:text-base">
        {title}
      </h3>
      <p className="font-bold text-h5 mb-2 md:text-h4">{subtitle}</p>
      <p className="text-label">{children}</p>
    </li>
  )
}

export default AboutUs
