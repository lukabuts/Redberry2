import exitIcon from "../../assets/images/exit.svg";

const ShowSelectedFiltersCard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="border border-lightGray px-2.5 py-1.5 rounded-3xl w-fit text-deepBlue text-opacity-80 flex items-center gap-1 flex-nowrap">
      <span className="text-nowrap">{children}</span>
      <button className="w-3.5 h-3.5">
        <img src={exitIcon} alt="Clear" className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default ShowSelectedFiltersCard;
