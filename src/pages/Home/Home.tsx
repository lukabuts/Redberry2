import { Outlet } from "react-router";
import RealEstateCard from "../../components/RealEstateCard/RealEstateCard";
import FilteringCard from "../../components/FilteringCard/FilteringCard";
import LoadingCard from "../../components/LoadingCard.tsx/LoadingCard";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  IsRealEstatesLoadingContext,
  RealEstatesContext,
  RealEstatesErrorContext,
} from "../../App";

const Home = () => {
  const isRealEstatesLoading = useContext(IsRealEstatesLoadingContext);
  const realEstatesError = useContext(RealEstatesErrorContext);
  const realEstates = useContext(RealEstatesContext);
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
