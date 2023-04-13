import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="z-10 shadow-[0px_-4px_8px_rgba(77,77,77,0.1)]">
      <div className="container flex items-center justify-center py-5 md:justify-between lg:py-6">
        <p className="hidden text-label md:block">
          Copyright © 2022 - All rights reserved
        </p>
        <Logo className="h-4 w-[95px]" />
      </div>
    </footer>
  );
};

export default Footer;
