import BrandName from "./BrandName";
import Input from "./Input";
import Button from "./Button";
import * as Modal from "./Modal";
import Checkbox from "./Checkbox";
import useModal from "@/hooks/useModal";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useAuth, useSignUp } from "@clerk/nextjs";
import LoadingSpinner from "./LoadingSpinner";

const SignUpModal = () => {
  const { isOpen, close } = useModal("signUp");
  const { open: openSignInModal } = useModal("signIn");
  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();

  const { isSignedIn } = useAuth();

  if (!isLoaded || isSignedIn) {
    return null;
  }

  return (
    <Modal.Root isOpen={isOpen} close={close}>
      <Modal.Title as="h2">
        Sign up to <BrandName />
      </Modal.Title>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirmation: "",
          acceptTos: false,
        }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          if (values.password !== values.passwordConfirmation) {
            setSubmitting(false);
            setFieldError("passwordConfirmation", "Passwords do not match");
            return;
          }

          if (!values.acceptTos) {
            setSubmitting(false);
            setFieldError("acceptTos", "You must accept terms of service");
            return;
          }

          const [firstName, ...lastNames] = values.name.split(" ");

          try {
            const signUpResult = await signUp.create({
              emailAddress: values.email,
              password: values.password,
              firstName,
              lastName: lastNames.join(" "),
            });

            if (signUpResult.status === "complete") {
              setActive({
                session: signUpResult.createdSessionId,
                beforeEmit: () => {
                  router.push("/dashboard");
                  close();
                },
              });
              return;
            }

            setFieldError("passwordConfirmation", "Something went wrong");
          } catch (err) {
            const error = err as {
              errors: {
                message: string;
                meta: {
                  paramName: string;
                };
              }[];
            };

            const firstError = error.errors[0];
            if (!firstError) {
              return;
            }

            setFieldError(firstError.meta.paramName, firstError.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-6 flex flex-col gap-6" noValidate>
            <Input
              type="username"
              name="name"
              placeholder="Name"
              required
              disabled={isSubmitting}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              disabled={isSubmitting}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              disabled={isSubmitting}
            />
            <Input
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm password"
              required
              disabled={isSubmitting}
            />

            <Checkbox
              className="text-left"
              required
              disabled={isSubmitting}
              name="acceptTos"
            >
              <span>
                I have read and accept the <strong>Privacy Policy</strong> and{" "}
                <strong>Terms of User Sign Up</strong>
              </span>
            </Checkbox>

            <Button
              className="w-full py-3"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoadingSpinner className="mx-auto" />
              ) : (
                "Sign up"
              )}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="mt-6 text-small-label">
        <span className="hidden md:inline">Already have an account? </span>
        <button
          onClick={() => {
            openSignInModal();
          }}
          className="font-bold hover:underline"
        >
          Sign in to <BrandName />
        </button>
      </div>
    </Modal.Root>
  );
};

export default SignUpModal;
