import Button from "@/components/Button";
import Input from "@/components/Input";
import { Form, Formik } from "formik";
import Image from "next/image";

const NewsLetterSection = () => {
  return (
    <section className="bg-gradient-newsletter relative mt-14 text-white">
      <Image
        src="/waves-newsletter.svg"
        width={1440}
        height={412}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full object-cover object-[60%] md:mt-0 md:object-[100%] lg:w-full lg:object-fill lg:object-left"
      />
      <div className="container isolate z-10 flex flex-col py-14 md:flex-row md:gap-8 md:py-20 lg:gap-[239px]">
        <div className="md:w-full">
          <h2 className="font-bold text-primary-200 md:text-h5 md:!leading-8 lg:text-h4">
            Newsletter
          </h2>
          <p className="text-h4 font-bold md:text-h3 lg:mt-1 lg:text-h2">
            Lorem ipsum
          </p>
          <p className="mt-2 text-label md:mt-4 md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,{" "}
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor
          </p>
        </div>

        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 3000);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-10 md:w-full" noValidate>
              <Input
                type="email"
                name="email"
                className="max-w-full border-none bg-white text-secondary"
                placeholder="Email"
                required
                disabled={isSubmitting}
              />

              <Button
                className="shadow-[0px_12px_24px_rgba(0,0,0,0.1) mt-4 w-full py-3 md:mt-[21px]"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Subscribe"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default NewsLetterSection;
