'use client'

import BrandName from './BrandName'
import Input from './Input'
import Button from './Button'
import * as Modal from './Modal'
import Checkbox from './Checkbox'
import useModal from '@/hooks/useModal'
import { Form, Formik } from 'formik'

const SignUpModal = () => {
  const { isOpen, close } = useModal('signUp')
  const { open: openSignInModal } = useModal('signIn')

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
        }}
        onSubmit={(values, { setSubmitting }) => {
          close()
        }}
      >
        <Form className="flex flex-col gap-6 mt-6">
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

          <Checkbox className="text-left">
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
