const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.value}
    height={props.value}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M19 12.75H5a.75.75 0 1 1 0-1.5h14a.75.75 0 1 1 0 1.5ZM19 8.25H5a.75.75 0 0 1 0-1.5h14a.75.75 0 1 1 0 1.5ZM19 17.25H5a.75.75 0 1 1 0-1.5h14a.75.75 0 1 1 0 1.5Z"
    />
  </svg>
);
export default SvgComponent;
