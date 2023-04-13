import { Asset } from "@prisma/client";
import Image from "next/image";
import FormattedNumber from "@/components/FormattedNumber";
import clsx from "clsx";
import Card from "./Card";

const DailyVariationCard = ({ asset }: { asset: Asset }) => {
  return (
    <Card className="flex w-1/2 flex-col md:flex-row">
      <div>
        <span className="mx-2 mt-2 whitespace-nowrap text-small-label text-secondary">
          Daily variation
        </span>
        <div className="mx-2 mt-2 flex items-center gap-4 md:mt-4 md:flex-col md:items-start md:gap-2">
          <div className="flex items-center gap-2">
            <Image
              alt=""
              src={asset.icon}
              width={16}
              height={16}
              className="h-4 w-4 md:h-6 md:w-6"
            />
            <span className="text-small-label md:text-label">{asset.id}</span>
          </div>
          <FormattedNumber
            number={asset.brlRateChangePercentage}
            className={clsx("text-label md:text-base", {
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
        </div>
      </div>
      <div className="mt-4 h-full w-full bg-gradient-to-b from-primary-300 to-primary-300/0 md:mt-0" />
    </Card>
  );
};

export default DailyVariationCard;
