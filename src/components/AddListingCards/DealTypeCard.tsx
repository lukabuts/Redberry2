import DealTypeInterface from "../../assets/typescript/interfaces/dealInterface";

const DealTypeCard = ({
  isRental,
  setIsRental,
  isForSale,
  setIsForSale,
}: DealTypeInterface) => {
  return (
    <>
      <div>
        <h2 className="text-deepBlue text-base font-semibold">
          გარიგების ტიპი
        </h2>
      </div>
      <div className="flex mt-2 gap-6">
        <div className="flex gap-1.5">
          <input
            onChange={() => {
              setIsRental(false);
              setIsForSale(true);
            }}
            required
            checked={isForSale}
            type="radio"
            name="type"
            id="sell"
            className="accent-black"
          />
          <label htmlFor="sell" className="text-sm text-deepBlue">
            იყიდება
          </label>
        </div>
        <div className="flex gap-1.5">
          <input
            onChange={() => {
              setIsRental(true);
              setIsForSale(false);
            }}
            checked={isRental}
            type="radio"
            name="type"
            id="rent"
            className="accent-black"
            required
          />
          <label htmlFor="rent" className="text-sm text-deepBlue">
            ქირავდება
          </label>
        </div>
      </div>
    </>
  );
};

export default DealTypeCard;
