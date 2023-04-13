import useModal from "@/hooks/useModal";
import Button, { Props as ButtonProps, primaryClassName } from "./Button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import clsx from "clsx";

type Props = Omit<ButtonProps, "type" | "onClick"> & {
  onClick?: () => void;
};

const SignUpButton = ({ onClick, className, children, ...props }: Props) => {
  const { open } = useModal("signUp");
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <Link
        href="/dashboard"
        className={clsx(primaryClassName, className)}
        {...props}
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        Go to dashboard
      </Link>
    );
  }

  return (
    <Button
      className={className}
      {...props}
      onClick={() => {
        if (onClick) onClick();

        open();
      }}
    >
      {children}
    </Button>
  );
};

export default SignUpButton;
