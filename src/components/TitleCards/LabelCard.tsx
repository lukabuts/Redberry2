import LabelCardInterface from "../../assets/typescript/interfaces/labelCardInterface";

const LabelCard = ({ HTMLfor, children }: LabelCardInterface) => {
  return (
    <label htmlFor={HTMLfor} className="text-sm font-semibold">
      {children}
    </label>
  );
};

export default LabelCard;
