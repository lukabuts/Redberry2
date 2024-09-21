import React from "react";

const PopUpWrapper = ({
  children,
  exitDialog,
}: {
  children: React.ReactNode;
  exitDialog: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 bg-deepBlue/35 backdrop-blur-sm"
      onClick={exitDialog}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default PopUpWrapper;
