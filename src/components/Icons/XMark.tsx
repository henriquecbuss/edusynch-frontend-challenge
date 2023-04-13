import clsx from "clsx";

const XMark = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      className={clsx("fill-secondary", className)}
    >
      <path
        fillRule="evenodd"
        d="M4.104 2.913a.842.842 0 1 0-1.19 1.191L6.808 8l-3.896 3.896a.842.842 0 1 0 1.191 1.19L8 9.192l3.896 3.896a.842.842 0 0 0 1.19-1.191L9.191 8l3.895-3.896a.842.842 0 1 0-1.19-1.19L8 6.808 4.104 2.913Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default XMark;
