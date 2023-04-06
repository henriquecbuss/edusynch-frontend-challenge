import BrandName from './BrandName'
import Input from './Input'
import Link from 'next/link'
import Button from './Button'
import * as Modal from './Modal'

type Props = {} & Modal.Props

const SignInModal = ({ ...modalProps }: Props) => {
  return (
    <Modal.Root {...modalProps}>
      <Modal.Title>
        Sign in to <BrandName />
      </Modal.Title>

      <Input type="email" placeholder="Email" className="mt-6" />
      <Input type="password" placeholder="Password" className="mt-6" />
      <Link
        href="#"
        className="text-small-label text-secondary hover:underline block w-max ml-auto mt-[9px]"
      >
        Forgot password?
      </Link>

      <Button
        onClick={() => {
          // TODO - Handle sign in
        }}
        className="mt-4 w-full py-3"
      >
        Sign in
      </Button>

      <span className="text-small-label mt-4">
        <span className="hidden md:inline">Don{"'"}t have an account? </span>
        <button
          onClick={() => {
            // TODO - Handle sign up
          }}
          className="font-bold hover:underline"
        >
          Sign up to <BrandName />
        </button>
      </span>
    </Modal.Root>
  )
}

export default SignInModal
