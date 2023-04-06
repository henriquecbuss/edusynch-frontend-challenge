'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Image from 'next/image'

const NewsLetterSection = () => {
  return (
    <section className="relative bg-gradient-newsletter mt-14 text-white">
      <Image
        src="/waves-newsletter.svg"
        width={1440}
        height={412}
        alt=""
        aria-hidden
        className="absolute inset-0 object-cover object-[60%] h-full md:mt-0 md:object-[100%] lg:object-left lg:object-fill lg:w-full"
      />
      <div className="container py-14 md:py-20 flex flex-col md:flex-row md:gap-8 lg:gap-[239px] isolate z-10">
        <div className="md:w-full">
          <h2 className="text-primary-200 font-bold md:text-h5 md:!leading-8 lg:text-h4">
            Newsletter
          </h2>
          <p className="font-bold text-h4 md:text-h3 lg:text-h2 lg:mt-1">
            Lorem ipsum
          </p>
          <p className="text-label mt-2 md:text-base md:mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,{' '}
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor
          </p>
        </div>

        <form className="mt-10 md:w-full">
          <Input
            type="email"
            className="border-none bg-white text-secondary max-w-full"
            placeholder="Email"
          />

          <Button
            className="py-3 w-full mt-4 shadow-[0px_12px_24px_rgba(0,0,0,0.1) md:mt-[21px]"
            type="submit"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}

export default NewsLetterSection
