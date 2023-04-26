import * as React from "react";
//https://www.svgrepo.com/svg/511185/user-02?edit=true
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={64}
    height={64}
    {...props}
  >
    <path
      stroke="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 21c0-2.761-3.582-5-8-5s-8 2.239-8 5m8-8a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
    />
  </svg>
);
export default SvgComponent;
