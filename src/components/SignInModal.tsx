import BrandName from './BrandName'
import Input from './Input'
import Link from 'next/link'
import Button from './Button'
import * as Modal from './Modal'

type Props = {} & Modal.Props

const SignInModal = ({ ...modalProps }: Props) => {
  return (
    <Modal.Root {...modalProps}>
      <Modal.Title as="h2">
        Sign in to <BrandName />
      </Modal.Title>

      <form
        onSubmit={() => {
          // TODO - Handle sign in
        }}
        className="mt-6"
      >
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" className="mt-6" />
        <Link
          href="#"
          className="text-small-label text-secondary hover:underline block w-max ml-auto mt-[9px]"
        >
          Forgot password?
        </Link>

        <Button className="mt-4 w-full py-3" type="submit">
          Sign in
        </Button>
      </form>

      <div className="text-small-label mt-4">
        <span className="hidden md:inline">Don{"'"}t have an account? </span>
        <button
          onClick={() => {
            // TODO - Handle sign up
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
