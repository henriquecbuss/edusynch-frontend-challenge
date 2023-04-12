'use client'

import BrandName from './BrandName'
import Input from './Input'
import Button from './Button'
import * as Modal from './Modal'
import Checkbox from './Checkbox'
import useModal from '@/hooks/useModal'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useSignUp } from '@clerk/nextjs'

const SignUpModal = () => {
  const { isOpen, close } = useModal('signUp')
  const { open: openSignInModal } = useModal('signIn')
  const router = useRouter()

  const { isLoaded, signUp, setActive } = useSignUp()

  if (!isLoaded) {
    return null
  }

  return (
    <Modal.Root isOpen={isOpen} close={close}>
      <Modal.Title as="h2">
        Sign up to <BrandName />
      </Modal.Title>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          acceptTos: false,
        }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          if (values.password !== values.passwordConfirmation) {
            setSubmitting(false)
            setFieldError('passwordConfirmation', 'Passwords do not match')
            return
          }

          if (!values.acceptTos) {
            setSubmitting(false)
            setFieldError('acceptTos', 'You must accept terms of service')
            return
          }

          const [firstName, ...lastNames] = values.name.split(' ')

          try {
            const signUpResult = await signUp.create({
              emailAddress: values.email,
              password: values.password,
              firstName,
              lastName: lastNames.join(' '),
            })

            if (signUpResult.status === 'complete') {
              setActive({ session: signUpResult.createdSessionId })
              router.push('/dashboard')
              close()
              return
            }

            setFieldError('passwordConfirmation', 'Something went wrong')
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
          } finally {
            setSubmitting(false)
          }
        }}
      >
        <Form className="flex flex-col gap-6 mt-6" noValidate>
          <Input type="username" name="name" placeholder="Name" required />
          <Input type="email" name="email" placeholder="Email" required />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm password"
            required
          />

          <Checkbox className="text-left" required name="acceptTos">
            <span>
              I have read and accept the <strong>Privacy Policy</strong> and{' '}
              <strong>Terms of User Sign Up</strong>
            </span>
          </Checkbox>

          <Button className="w-full py-3" type="submit">
            Sign up
          </Button>
        </Form>
      </Formik>

      <div className="text-small-label mt-6">
        <span className="hidden md:inline">Already have an account? </span>
        <button
          onClick={() => {
            openSignInModal()
          }}
          className="font-bold hover:underline"
        >
          Sign in to <BrandName />
        </button>
      </div>
    </Modal.Root>
  )
}

export default SignUpModal
