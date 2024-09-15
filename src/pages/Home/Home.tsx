import { Outlet } from "react-router";
import RealEstateCard from "../../components/RealEstateCard/RealEstate";
import FilteringCard from "../../components/FilteringCard/FilteringCard";

const Home = () => {
  return (
    <div>
      <div className="flex mt-16 justify-between mb-8 items-center">
        <FilteringCard />
      </div>
      <div className="grid grid-cols-autoFillEstateCard justify-around gap-5">
        <RealEstateCard />
        <RealEstateCard />
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
