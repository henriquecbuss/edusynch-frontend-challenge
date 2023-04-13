import clsx from "clsx";
import Card from "./Card";
import Icons from "@/components/Icons";
import Button from "@/components/Button";
import useModal from "@/hooks/useModal";

type Props = {
  wallets: Record<string, string>[];
};

const MyWalletCard = ({ wallets }: Props) => {
  return (
    <>
      <Header className="mt-6 md:hidden" />
      <Card className="mt-4 md:mt-8">
        <Header className="hidden md:flex" />
        <hr className="hidden text-secondary-200 md:flex" />
        {wallets.length === 0 && (
          <div className="flex flex-col items-center justify-center px-14 py-10 text-center md:py-20">
            <Icons.NoWallets className="h-12 md:h-[68px]" />
            <p className="mt-4 font-bold md:mt-6 md:text-h5">
              Nothing here yet...
            </p>
            <p className="mt-2 text-small-label md:text-label">
              Add a crypto and start earning
            </p>
          </div>
        )}
      </Card>
    </>
  );
};

const Header = ({ className }: { className?: string }) => {
  const { open: openAddCryptoModal } = useModal("addCrypto");

  return (
    <div className={clsx("flex items-center gap-4 md:p-6", className)}>
      <Icons.CryptoWallet className="h-6 w-6 md:h-8 md:w-8" />
      <span className="text-h5 font-bold md:text-h4">My Wallet</span>
      <Button
        className="ml-auto h-6 w-6 rounded-full !p-0 md:h-auto md:w-auto md:!px-4 md:!py-2"
        onClick={openAddCryptoModal}
      >
        <span>+</span>
        <span className="ml-2 hidden md:inline">Add crypto</span>
      </Button>
    </div>
  );
};

export default MyWalletCard;
