import useModal from "@/hooks/useModal";
import Button, { Props as ButtonProps } from "./Button";
import { useAuth } from "@clerk/nextjs";

type Props = Omit<ButtonProps, "type">;

const SignInButton = ({ onClick, children, ...props }: Props) => {
  const { open } = useModal("signIn");
  const { isSignedIn, signOut } = useAuth();

  if (isSignedIn) {
    return (
      <Button
        {...props}
        onClick={(e) => {
          if (onClick) onClick(e);

          signOut();
        }}
      >
        Sign out
      </Button>
    );
  }

  return (
    <Button
      {...props}
      onClick={(e) => {
        if (onClick) onClick(e);

        open();
      }}
    >
      {children}
    </Button>
  );
};

export default SignInButton;
