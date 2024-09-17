import React from "react";

const FilledButtonCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="text-white bg-flameRed py-3.5 px-4 rounded-lg font-medium text-base hover:bg-hoveredFlameRed transition-colors">
      {children}
    </button>
  );
};

export default FilledButtonCard;
