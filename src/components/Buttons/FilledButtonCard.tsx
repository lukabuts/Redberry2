import { ButtonCardInterface } from "../../assets/typescript/interfaces/buttonCardInterface";

const FilledButtonCard = ({
  children,
  disabled,
  onClick,
}: ButtonCardInterface) => {
  return (
    <button
      disabled={disabled}
      className="text-white bg-flameRed py-3.5 px-4 rounded-lg font-medium text-base hover:bg-hoveredFlameRed transition-colors disabled:bg-opacity-80"
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
};

export default FilledButtonCard;
