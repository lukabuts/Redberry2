import { Outlet } from "react-router";
import RealEstateCard from "../../components/RealEstateCard/RealEstateCard";
import FilteringCard from "../../components/FilteringCard/FilteringCard";
import LoadingCard from "../../components/LoadingCard.tsx/LoadingCard";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
// import { getRealEstates } from "../../utils/getRealEstates";
import { TokenContext } from "../../App";
import { realEstateType } from "../../assets/typescript/types/realEstateType";
import { getRealEstates } from "../../utils/getRealEstates";

const Home = () => {
  const token = useContext(TokenContext);
  // Real estates
  const [realEstates, setRealEstates] = useState<realEstateType[]>([]);
  const [isRealEstatesLoading, setIsRealEstatesLoading] = useState(false);
  const [realEstatesError, setRealEstatesError] = useState("");

  // Get Real Estates
  useEffect(() => {
    getRealEstates(
      setIsRealEstatesLoading,
      token,
      setRealEstates,
      setRealEstatesError
    );
  }, []);

  return (
    <div className="mx-36 mt-16 mb-14">
      <div className="flex justify-between mb-8 items-center">
        <FilteringCard />
      </div>
      {isRealEstatesLoading ? (
        <LoadingCard />
      ) : realEstatesError ? (
        <span className="text-errColor">Error: {realEstatesError}</span>
      ) : (
        <div className="grid grid-cols-autoFillEstateCard justify-around gap-5">
          {realEstates.map((realEstate) => (
            <Link to={`/real-estates/${realEstate.id}`} key={realEstate.id}>
              <RealEstateCard realEstate={realEstate} />
            </Link>
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Home;
