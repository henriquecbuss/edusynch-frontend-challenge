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
import { useState } from "react";
import { Popover, Transition } from "@headlessui/react";

const MyWalletCard = () => {
  const { data: walletEntries } = api.walletEntry.getAll.useQuery();

  return (
    <>
      <Header className="mt-6 md:hidden" />
      <div className="mt-4 grid grid-cols-2 gap-4 md:hidden">
        {walletEntries &&
          walletEntries.length > 0 &&
          walletEntries?.map((entry) => (
            <SingleEntryCard entry={entry} key={entry.asset.id} />
          ))}
      </div>
      <Card className="mt-4 overflow-visible md:mt-8">
        <Header className="hidden rounded-t-lg md:flex" />
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
          <table className="mt-4 hidden rounded-b-lg md:table">
            <thead>
              <tr className="text-left">
                <Th className="w-1/12">#</Th>
                <Th className="w-1/3">Crypto</Th>
                <Th className="w-1/3">Holdings</Th>
                <Th className="w-1/3">Change</Th>
                <Th className="w-1/12">Trade</Th>
              </tr>
            </thead>
            <tbody className="rounded-b-lg">
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
        onClick={() => openAddCryptoModal()}
      >
        <span>+</span>
        <span className="ml-2 hidden md:inline">Add crypto</span>
      </Button>
    </div>
  );
};

const SingleEntryCard = ({
  entry,
}: {
  entry: WalletEntry & { asset: Asset };
}) => {
  const { open: openTradeCryptoModal } = useModal("tradeCrypto");

  return (
    <Card>
      <div className="flex items-center bg-primary-100 px-2 py-4 text-small-label">
        <Image src={entry.asset.icon} width={16} height={16} alt="" />
        <span className="ml-2">{entry.asset.name}</span>
        <span className="ml-1 text-secondary">{entry.asset.id}</span>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-1">
          <span className="text-small-label text-secondary">Holdings</span>
          <FormattedNumber
            number={entry.asset.priceUsd * entry.amount}
            className="whitespace-nowrap text-label"
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

        <hr className="text-secondary-200" />

        <div className="flex flex-col gap-1">
          <span className="text-small-label text-secondary">Change</span>
          <FormattedNumber
            number={entry.asset.brlRateChangePercentage}
            className={clsx("text-label", {
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
        </div>
        <Button
          className="w-full py-1"
          onClick={() => openTradeCryptoModal({ entry })}
        >
          Trade
        </Button>
      </div>
    </Card>
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
    <tr className="max-h-16 transition-colors last:rounded-b-lg even:bg-secondary-100 hover:bg-secondary-100 even:hover:bg-secondary-200">
      <Cell className="rounded-bl-lg text-label">
        {index < 10 ? `0${index}` : index}
      </Cell>
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
      <Cell className="rounded-br-lg">
        <TradePopover entry={entry} />
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

const TradePopover = ({ entry }: { entry: WalletEntry & { asset: Asset } }) => {
  const [isShowing, setIsShowing] = useState(false);
  const { open: openTradeCryptoModal } = useModal("tradeCrypto");

  return (
    <Popover
      className="relative"
      onMouseEnter={() => setIsShowing(true)}
      onMouseLeave={() => setIsShowing(false)}
    >
      <Popover.Button
        className="flex items-center justify-center"
        onClick={() => openTradeCryptoModal({ entry })}
      >
        <Icons.Trade className="h-4 w-4" />
      </Popover.Button>
      <Transition
        show={isShowing}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="absolute left-1/2 top-full isolate z-50 mt-4 flex origin-top -translate-x-1/2 items-center justify-center rounded bg-primary px-6 py-2 text-center shadow-[0px_4px_8px_rgba(0,0,0,0.1)]"
      >
        <Popover.Panel static>
          <div
            className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-primary"
            aria-hidden
          />
          <span className="text-label text-white">Transfer Crypto</span>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default MyWalletCard;
