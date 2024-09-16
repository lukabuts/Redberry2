import { useNavigate } from "react-router";

const ActionButtonsCard = () => {
  const navigate = useNavigate();

  // Handle Cancel Operation
  function handleCancelOperation() {
    navigate("/");
    localStorage.removeItem("addListingInfo");
  }

  return (
    <>
      <button
        onClick={handleCancelOperation}
        className="text-white bg-flameRed py-3.5 px-4 rounded-lg font-medium text-base hover:bg-hoveredFlameRed transition-colors"
      >
        გაუქმება
      </button>
      <button className="text-flameRed border border-flameRed py-3.5 px-4 rounded-lg font-medium text-base hover:bg-flameRed hover:text-white transition-colors">
        დაამატე ლისტინგი
      </button>
    </>
  );
};

export default ActionButtonsCard;
