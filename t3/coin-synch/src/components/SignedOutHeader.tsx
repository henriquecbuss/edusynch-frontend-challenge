import { useRef } from "react";
import Logo from "./Logo";
import Link from "next/link";
import CoinCarrousel from "./CoinCarrousel";
import { Asset } from "@/utils/coinapi";
import SignInSignUpMenu from "./SignInSignUpMenu";

type Props = {
  assets: Asset[];
};

const SignedOutHeader = ({ assets }: Props) => {
  const headerRef = useRef<HTMLElement>(null);
  const carrouselRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <header className="container flex items-center py-4" ref={headerRef}>
        <Link href="/" className="md:mr-10">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <HeaderLink href="#about-us">About us</HeaderLink>

          <HeaderLink href="#top-cryptos">Top cryptos</HeaderLink>
        </nav>

        <CoinCarrousel
          className="ml-auto hidden max-w-[360px] lg:flex"
          assets={assets}
        />

        <SignInSignUpMenu
          className="ml-auto hidden md:block lg:ml-20"
          headerRef={headerRef}
          coinCarrouselRef={carrouselRef}
        />
      </header>
      <hr className="text-secondary-200" />

      <div className="shadow-md lg:hidden" ref={carrouselRef}>
        <CoinCarrousel className="mx-auto max-w-[360px]" assets={assets} />
      </div>
    </>
  );
};

const HeaderLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a href={href} className="text-label hover:underline">
      {children}
    </a>
  );
};

export default SignedOutHeader;
