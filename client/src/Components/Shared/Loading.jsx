import React from "react";

const Loading = ({ isLoading }) => {
  return (
    <div className="height-sm">
      {isLoading && <div className="loader"></div>}
    </div>
  );
};

export default Loading;
