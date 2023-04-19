import React from "react";

const Overlay = ({ children, setShow }) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-[9999]">
      {children}
    </div>
  );
};

export default Overlay;
