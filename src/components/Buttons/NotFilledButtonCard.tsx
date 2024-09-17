import React from "react";

const NotFilledButtonCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="button"
      className="text-flameRed border border-flameRed py-3.5 px-4 rounded-lg font-medium text-base hover:bg-flameRed hover:text-white transition-colors"
    >
      {children}
    </button>
  );
};

export default NotFilledButtonCard;
