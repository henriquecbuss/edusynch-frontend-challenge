import clsx from "clsx";
import Card from "./Card";
import Icons from "@/components/Icons";
import Button from "@/components/Button";
import useModal from "@/hooks/useModal";
import Image from "next/image";
import { api } from "@/utils/api";
import LoadingSpinner from "../LoadingSpinner";
import { type Asset, type WalletEntry } from "@prisma/client";
import FormattedNumber from "../FormattedNumber";

const MyWalletCard = () => {
  const { data: walletEntries } = api.walletEntry.getAll.useQuery();

  return (
    <>
      <Header className="mt-6 md:hidden" />
      <Card className="mt-4 md:mt-8">
        <Header className="hidden md:flex" />
        <hr className="hidden text-secondary-200 md:flex" />
        {walletEntries === undefined && (
          <LoadingSpinner size={48} className="mx-auto my-10" />
        )}
        {walletEntries && walletEntries.length === 0 && (
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
        {walletEntries && walletEntries.length > 0 && (
          <table className="mt-4">
            <thead>
              <tr className="text-left">
                <Th className="w-1/12">#</Th>
                <Th className="w-1/3">Crypto</Th>
                <Th className="w-1/3">Holdings</Th>
                <Th className="w-1/3">Change</Th>
                <Th className="w-1/12">Trade</Th>
              </tr>
            </thead>
            <tbody>
              {walletEntries.map((walletEntry, index) => (
                <Row
                  entry={walletEntry}
                  index={index + 1}
                  key={walletEntry.assetId}
                />
              ))}
            </tbody>
          </table>
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

const Th = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <th
      className={clsx(
        "px-6 py-4 text-label font-normal text-secondary",
        className
      )}
    >
      {children}
    </th>
  );
};

const Row = ({
  entry,
  index,
}: {
  entry: WalletEntry & { asset: Asset };
  index: number;
}) => {
  return (
    <tr className="max-h-16 transition-colors even:bg-secondary-100 hover:bg-secondary-100 even:hover:bg-secondary-200">
      <Cell className="text-label">{index < 10 ? `0${index}` : index}</Cell>
      <Cell className="flex items-center gap-2">
        <Image src={entry.asset.icon} alt="" width={32} height={32} />
        <p className="text-small-label">
          {entry.asset.name}{" "}
          <span className="text-secondary">{entry.asset.id}</span>
        </p>
      </Cell>
      <Cell>
        <div className="flex flex-col gap-1">
          <FormattedNumber
            number={entry.asset.priceUsd * entry.amount}
            className="text-label"
            options={{
              signDisplay: "never",
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 4,
              minimumFractionDigits: 4,
            }}
          />
          <span className="text-small-label text-primary">
            {entry.amount} {entry.asset.id}
          </span>
        </div>
      </Cell>
      <Cell>
        <FormattedNumber
          number={entry.asset.brlRateChangePercentage}
          className={clsx({
            "text-tertiary-700": entry.asset.brlRateChangePercentage > 0,
            "text-quaternary-700": entry.asset.brlRateChangePercentage < 0,
          })}
          options={{
            signDisplay: "always",
            style: "percent",
            maximumFractionDigits: 4,
            minimumFractionDigits: 4,
          }}
        />
      </Cell>
      <Cell>
        <Icons.Trade className="h-6 w-6" />
      </Cell>
    </tr>
  );
};

const Cell = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <td className={clsx("px-6 py-4 text-left", className)}>{children}</td>;
};

export default MyWalletCard;
