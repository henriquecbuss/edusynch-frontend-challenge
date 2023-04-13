import clsx from "clsx";
import { useEffect, useState } from "react";

type Props = {
  number: number;
  className?: string;
  options?: Intl.NumberFormatOptions;
};

const FormattedNumber = ({ number, className, options }: Props) => {
  const [formatNumber, setFormatNumber] = useState<
    | ((num: number, options: Intl.NumberFormatOptions | undefined) => string)
    | null
  >(null);

  useEffect(() => {
    setFormatNumber(() => {
      return (num: number, options: Intl.NumberFormatOptions | undefined) => {
        return num
          .toLocaleString(navigator.language, options)
          .replace(/^(\D+)/, "$1 ")
          .replace(/\s+/, " ")
          .replace(/^(-|\+)\ /, "$1");
      };
    });
  }, []);

  return (
    <span
      className={clsx(
        {
          "h-2 w-8 animate-pulse rounded-sm bg-secondary-400":
            formatNumber === null,
        },
        "inline-block",
        className
      )}
    >
      {formatNumber && formatNumber(number, options)}
    </span>
  );
};

export default FormattedNumber;
