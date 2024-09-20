import UListCardInterface from "../../assets/typescript/interfaces/uListCardInterface";

const UListCard = ({ type, setValue }: UListCardInterface) => {
  const avaliableValues = [50000, 100000, 150000, 200000, 300000];
  return (
    <ul className="space-y-2 mt-4">
      {avaliableValues.map((avaliableValue) => (
        <li key={avaliableValue} className="text-sm text-deepBlue">
          <button
            onClick={() => {
              setValue(String(avaliableValue));
            }}
          >
            {avaliableValue.toLocaleString()}{" "}
            {type === "price" ? (
              "₾"
            ) : (
              <span>
                მ<sup>2</sup>
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UListCard;
