type Props = {
  className?: string
}
export default function Hamburger({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      className={className}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="#8C8A97"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      />
      <path
        stroke="#8C8A97"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M7.25 12h9.5M7.25 15.25h9.5M7.25 8.75h9.5"
      />
    </svg>
  )
}
