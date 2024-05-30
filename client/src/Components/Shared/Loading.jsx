import React from "react";
import "./Loading.scss";

const Loading = ({ isLoading }) => {
  return (
    <div className="loader-wrapper">
      {isLoading && <div className="loader"></div>}
    </div>
  );
};

export default Loading;
