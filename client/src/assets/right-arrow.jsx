import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    width={64}
    height={64}
    {...props}
  >
    <title />
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="m16.4 7 5.1 5-5.1 5" data-name="Right" />
      <path d="M2.5 12h16.7" />
    </g>
  </svg>
);
export default SvgComponent;
