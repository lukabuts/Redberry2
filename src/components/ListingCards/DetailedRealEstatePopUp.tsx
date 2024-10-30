import PopUpWrapper from "../../components/PopUpWrapper/PopUpWrapper";
import NotFilledButtonCard from "../../components/Buttons/NotFilledButtonCard";
import FilledButtonCard from "../../components/Buttons/FilledButtonCard";
import exitIcon from "../../assets/images/exit.svg";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import axios from "axios";
import { TokenContext } from "../../App";
const DetailedRealEstatePopUp = ({
  setShowPopUp,
}: {
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Navigate
  const navigate = useNavigate();
  // Get Estate Id
  const { id } = useParams<{ id: string }>();
  // Get Token
  const token = useContext(TokenContext);
  // Delete Real Estate
  function deleteRealEstate() {
    axios
      .delete(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        navigate("/");
      });
  }

  function exitDialog() {
    setShowPopUp(false);
  }
  return (
    <PopUpWrapper exitDialog={exitDialog}>
      <div
        className="flex gap-8 flex-col bg-white px-28 py-16 rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-center">გსურთ წაშალოთ ლისტინგი?</span>
        <div className="flex gap-4">
          <NotFilledButtonCard onClick={exitDialog}>
            გაუქმება
          </NotFilledButtonCard>
          <FilledButtonCard onClick={deleteRealEstate}>
            დადასტურება
          </FilledButtonCard>
        </div>
        <button className="absolute top-5 right-5 p-1" onClick={exitDialog}>
          <img loading="lazy" src={exitIcon} alt="Exit" className="w-5 h-5" />
        </button>
      </div>
    </PopUpWrapper>
  );
};

export default DetailedRealEstatePopUp;
