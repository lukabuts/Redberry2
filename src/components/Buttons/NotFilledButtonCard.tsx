import { ButtonCardInterface } from "../../assets/typescript/interfaces/buttonCardInterface";

const NotFilledButtonCard = ({
  children,
  disabled,
  onClick,
}: ButtonCardInterface) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className="text-flameRed border border-flameRed py-3.5 px-4 rounded-lg font-medium text-base hover:bg-flameRed hover:text-white transition-colors disabled:opacity-80 not-filled-button"
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

export default NotFilledButtonCard;
