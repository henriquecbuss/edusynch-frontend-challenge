const SvgComponent = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <circle cx={12} cy={12} r={11.5} stroke="#FBAB34" />
    <path
      fill="#FBAB34"
      d="M10.862 16.233a.58.58 0 0 1-.821 0l-3.87-3.87a.579.579 0 0 1 0-.822l3.87-3.87a.58.58 0 0 1 .821.82l-2.88 2.88h9.437a.58.58 0 0 1 0 1.161H7.982l2.88 2.88a.58.58 0 0 1 0 .821Z"
    />
  </svg>
)
export default SvgComponent
