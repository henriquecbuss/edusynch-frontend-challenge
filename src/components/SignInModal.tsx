'use client'

import BrandName from './BrandName'
import Input from './Input'
import Link from 'next/link'
import Button from './Button'
import * as Modal from './Modal'
import useModal from '@/hooks/useModal'
import { Form, Formik } from 'formik'

const SignInModal = () => {
  const { isOpen, close } = useModal('signIn')
  const { open: openSignUpModal } = useModal('signUp')

  return (
    <Modal.Root isOpen={isOpen} close={close}>
      <Modal.Title as="h2">
        Sign in to <BrandName />
      </Modal.Title>

      <Formik
        initialValues={{}}
        onSubmit={(values, { setSubmitting }) => {
          console.log('submitted')
        }}
      >
        <Form className="mt-6">
          <Input type="email" name="email" placeholder="Email" required />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="mt-6"
            required
          />
          <Link
            href="#"
            className="text-small-label text-secondary hover:underline block w-max ml-auto mt-[9px]"
          >
            Forgot password?
          </Link>

          <Button className="mt-4 w-full py-3" type="submit">
            Sign in
          </Button>
        </Form>
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
