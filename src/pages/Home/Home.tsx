import { Outlet } from "react-router";
import RealEstateCard from "../../components/RealEstateCard/RealEstate";
import FilteringCard from "../../components/FilteringCard/FilteringCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TokenContext } from "../../App";
import { realEstateType } from "../../assets/typescript/types/realEstateType";
import LoadingCard from "../../components/LoadingCard.tsx/LoadingCard";

const Home = () => {
  // Token
  const token = useContext(TokenContext);
  // Real estates
  const [realEstates, setRealEstates] = useState<realEstateType[]>([]);
  const [isRealEstatesLoading, setIsRealEstatesLoading] = useState(false);
  const [realEstatesError, setRealEstatesError] = useState("");
  // Get Real Estates
  useEffect(() => {
    setIsRealEstatesLoading(true);
    axios
      .get(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setRealEstates(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setRealEstatesError(err.message);
      })
      .finally(() => {
        setIsRealEstatesLoading(false);
      });
  }, [token]);
  return (
    <div className="mx-36 mt-16 mb-14">
      <div className="flex justify-between mb-8 items-center">
        <FilteringCard />
      </div>
      {isRealEstatesLoading ? (
        <LoadingCard />
      ) : realEstatesError ? (
        <span className="text-errColor">{realEstatesError}</span>
      ) : (
        <div className="grid grid-cols-autoFillEstateCard justify-around gap-5">
          {realEstates.map((realEstate) => (
            <RealEstateCard key={realEstate.id} realEstate={realEstate} />
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Home;
