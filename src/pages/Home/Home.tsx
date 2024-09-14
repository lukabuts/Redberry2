import { Outlet } from "react-router";
import RealEstateCard from "../../components/RealEstateCard/RealEstate";

const Home = () => {
  return (
    <div>
      <div className="grid grid-cols-autoFillEstateCard justify-around gap-5">
        <RealEstateCard />
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
