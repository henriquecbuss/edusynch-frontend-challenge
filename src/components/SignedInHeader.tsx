import { useRef, useState } from "react";
import Icons from "./Icons";
import SlideOver from "./SlideOver";
import Logo from "./Logo";
import User from "./User";
import Link from "next/link";

const SignedInHeader = () => {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  return (
    <>
      <header
        className="container grid grid-cols-3 grid-rows-1 py-4 shadow-md lg:flex lg:items-center lg:justify-between"
        ref={headerRef}
      >
        <button
          className="place-self-start lg:hidden"
          onClick={() => setIsSlideOverOpen((prev) => !prev)}
          aria-label="Open navigation menu"
        >
          <Icons.Hamburger />
        </button>

        <Logo className="place-self-center" />

        <User className="place-self-end" />
      </header>

      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        side="left"
        hiddenBreakpoint="lg"
        overlayClassName="top-[--top-distance]"
        overlayStyle={{
          "--top-distance": `${headerRef.current?.clientHeight ?? 0}px`,
        }}
        dialogClassName="mt-[--header-height] border-t border-secondary-300"
        dialogStyle={{
          "--header-height": `${headerRef.current?.clientHeight ?? 0}px`,
        }}
      >
        <nav className="flex flex-col gap-8 px-6 py-4">
          <SlideOverLink
            href="#"
            icon={(props) => <Icons.CryptoWallet {...props} />}
          >
            Lorem ipsum
          </SlideOverLink>
          <SlideOverLink
            href="#"
            icon={(props) => <Icons.CryptoCurrencyCircle {...props} />}
          >
            Lorem ipsum
          </SlideOverLink>
          <SlideOverLink
            href="#"
            icon={(props) => <Icons.CryptoCurrency {...props} />}
          >
            Lorem ipsum
          </SlideOverLink>
          <SlideOverLink href="#" icon={(props) => <Icons.Chart {...props} />}>
            Lorem ipsum
          </SlideOverLink>

          <button
            aria-label="Close navigation menu"
            className="mt-[14px] w-max"
            onClick={() => setIsSlideOverOpen(false)}
          >
            <Icons.CircledArrowLeft className="h-6 w-6" />
          </button>
        </nav>
      </SlideOver>
    </>
  );
};

const SlideOverLink = ({
  href,
  icon,
  children,
}: {
  href: string;
  icon: (props: { className: string }) => React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 text-label transition-colors hover:text-primary hover:underline"
    >
      {icon({ className: "h-6 w-6" })}
      {children}
    </Link>
  );
};

export default SignedInHeader;
