import clsx from "clsx";
import Button from "./Button";
import FormattedNumber from "./FormattedNumber";
import Image from "next/image";
import { type Asset } from "@prisma/client";

const CryptoRow = ({ asset, index }: { asset: Asset; index: number }) => {
  return (
    <tr className="max-h-16 transition-colors even:bg-secondary-100 hover:bg-secondary-100 even:hover:bg-secondary-200">
      <Cell>{index < 10 ? `0${index}` : index}</Cell>
      <Cell className="flex items-center gap-2">
        <Image src={asset.icon} alt="" width={32} height={32} />
        <p className="text-small-label">
          {asset.name} <span className="text-secondary">{asset.id}</span>
        </p>
      </Cell>
      <Cell>${asset.priceUsd}</Cell>
      <Cell>
        <FormattedNumber
          number={asset.brlRateChangePercentage}
          className={clsx({
            "text-tertiary-700": asset.brlRateChangePercentage > 0,
            "text-quaternary-700": asset.brlRateChangePercentage < 0,
          })}
          options={{
            signDisplay: "always",
            style: "percent",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }}
        />
      </Cell>
      <Cell>
        <Button className="bg-tertiary-700 hover:bg-tertiary-600 focus-visible:ring-primary active:bg-tertiary-800">
          Buy
        </Button>
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
  return <td className={clsx("px-6 py-4", className)}>{children}</td>;
};

export default CryptoRow;
