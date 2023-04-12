'use client'

import BrandName from './BrandName'
import Input from './Input'
import Link from 'next/link'
import Button from './Button'
import * as Modal from './Modal'
import useModal from '@/hooks/useModal'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useAuth, useSignIn } from '@clerk/nextjs'

const SignInModal = () => {
  const { isOpen, close } = useModal('signIn')
  const { open: openSignUpModal } = useModal('signUp')
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()
  const { isSignedIn } = useAuth()

  if (!isLoaded || isSignedIn) {
    return null
  }

  return (
    <Modal.Root isOpen={isOpen} close={close}>
      <Modal.Title as="h2">
        Sign in to <BrandName />
      </Modal.Title>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const signInResult = await signIn.create({
              identifier: values.email,
              password: values.password,
            })

            if (signInResult.status === 'complete') {
              setActive({
                session: signInResult.createdSessionId,
                beforeEmit: () => {
                  close()
                  router.push('/dashboard')
                  setSubmitting(false)
                },
              })
              return
            }

            setFieldError('password', 'Something went wrong')
            setSubmitting(false)
          } catch (err) {
            const error = err as {
              errors: {
                message: string
                meta: {
                  paramName: string
                }
              }[]
            }

            const firstError = error.errors[0]
            setFieldError(firstError.meta.paramName, firstError.message)
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-6">
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
              className="mt-6"
              required
              disabled={isSubmitting}
            />
            <Link
              href="#"
              className="text-small-label text-secondary hover:underline block w-max ml-auto mt-[9px]"
            >
              Forgot password?
            </Link>

            <Button
              className="mt-4 w-full py-3"
              type="submit"
              disabled={isSubmitting}
            >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>

      <div className="text-small-label mt-4">
        <span className="hidden md:inline">Don{"'"}t have an account? </span>
        <button
          onClick={() => {
            openSignUpModal()
          }}
          className="font-bold hover:underline"
        >
          Sign up to <BrandName />
        </button>
      </div>
    </Modal.Root>
  )
}

export default SignInModal
