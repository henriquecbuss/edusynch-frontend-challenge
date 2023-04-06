import Button from '@/components/Button'
import Icons from '@/components/Icons'
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
        className="object-cover object-[40%] h-[180px] -mt-10 sm:h-[247px] sm:object-[50%]"
      />
    </main>
  )
}

const Landing = () => {
  return (
    <section className="mt-14 container text-center flex flex-col items-center">
      <h1 className="font-bold text-h5 text-primary">
        Lorem ipsum dolor sit amet, consectetur
      </h1>
      <p className="text-label mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,{' '}
        purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
      </p>
      <Button className="uppercase flex items-center justify-center gap-2 mx-auto mt-6 w-[180px]">
        Sign up now <Icons.ArrowRight />
      </Button>

      <ul className="flex items-center gap-4 mt-6">
        <Tag>Cryptos</Tag>
        <Tag>NFTs</Tag>
        <Tag>Games</Tag>
      </ul>
    </section>
  )
}

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="bg-primary-100 text-primary py-1 px-4 rounded-[4px]">
      {children}
    </li>
  )
}

const WaveMd = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="763"
      height="247"
      fill="none"
    >
      <mask
        id="a"
        width="768"
        height="247"
        x="-5"
        y="0"
        maskUnits="userSpaceOnUse"
        // style="mask-type:alpha"
      >
        <path fill="#D9D9D9" d="M-5 0h768v247H-5z" />
      </mask>
      <g mask="url(#a)">
        <path
          fill="url(#b)"
          d="M1110.07 251.999H-344.927c-79.137-25.622-185.031-110.528-64.865-133.176 150.208-28.31 238.921 12.901 470.281 28.31 231.36 15.409 159.281-24.189 401.73-79.554 193.959-44.293 506.719-45.16 647.851-32.08V252Z"
        />
        <path
          fill="url(#c)"
          d="M1104 245.5H-341c-68.777-29.076-172.382-125.576-44.836-142.276 159.432-20.875 231.844 24.064 455.257 50.249 223.412 26.186 166.873-16.371 427.843-59.625C706.04 59.245 969.095 120.388 1104 139.999V245.5Z"
        />
        <path
          fill="url(#d)"
          d="M1225.17 247H-355c-68.777-29.075-31.382-160.076 96.164-176.776C-99.404 49.35-26.992 94.288 196.421 120.473c223.412 26.186 166.873-16.371 427.843-59.625 208.776-34.603 530.776-4.031 665.686 15.58L1225.17 247Z"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1="334.573"
          x2="334.573"
          y1="38"
          y2="224"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBAB34" stopOpacity=".2" />
          <stop offset="1" stop-color="#FBAB34" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="381.917"
          x2="372.991"
          y1="58.564"
          y2="245.345"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FBAB34" stop-opacity=".2" />
          <stop offset="1" stop-color="#FBAB34" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="d"
          x1="508.915"
          x2="499.989"
          y1="25.564"
          y2="212.346"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FBAB34" stop-opacity=".2" />
          <stop offset="1" stop-color="#FBAB34" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const WaveSm = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="320"
      // width="100%"
      height="180"
      fill="none"
    >
      <mask
        id="a"
        width="768"
        height="180"
        x="-147"
        y="0"
        maskUnits="userSpaceOnUse"
        // style="mask-type:alpha"
      >
        <path fill="#D9D9D9" d="M-147 0h768v180h-768z" />
      </mask>
      <g mask="url(#a)">
        <path
          fill="url(#b)"
          d="M968.072 184.999h-1455c-79.136-25.622-185.031-110.528-64.865-133.176 150.208-28.31 238.921 12.9 470.281 28.31C149.85 95.543 77.77 55.944 320.22.579c193.959-44.293 506.718-45.16 647.853-32.08V185Z"
        />
        <path
          fill="url(#c)"
          d="M962 178.502H-483c-68.777-29.076-172.382-125.576-44.836-142.276 159.432-20.875 231.844 24.064 455.257 50.25C150.833 112.66 94.293 70.103 355.264 26.85 564.04-7.753 827.095 53.39 962 73v105.501Z"
        />
        <path
          fill="url(#d)"
          d="M1083.17 180.001H-497c-68.777-29.075-31.382-160.076 96.164-176.776 159.432-20.874 231.844 24.064 455.257 50.25C277.833 79.66 221.294 37.102 482.264-6.151c208.776-34.603 530.776-4.031 665.686 15.58l-64.78 170.572Z"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1="192.572"
          x2="192.572"
          y1="-29"
          y2="157"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FBAB34" stop-opacity=".2" />
          <stop offset="1" stop-color="#FBAB34" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="239.916"
          x2="230.991"
          y1="-8.434"
          y2="178.347"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FBAB34" stop-opacity=".2" />
          <stop offset="1" stop-color="#FBAB34" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="d"
          x1="366.914"
          x2="357.989"
          y1="-41.435"
          y2="145.347"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FBAB34" stop-opacity=".2" />
          <stop offset="1" stop-color="#FBAB34" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Home
