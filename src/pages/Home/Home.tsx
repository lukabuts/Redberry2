import { Outlet } from "react-router";
import RealEstateCard from "../../components/RealEstateCard/RealEstateCard";
import FilteringCard from "../../components/FilteringCard/FilteringCard";
import LoadingCard from "../../components/LoadingCard.tsx/LoadingCard";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../App";
import { realEstateType } from "../../assets/typescript/types/realEstateType";
import { getRealEstates } from "../../utils/getRealEstates";
import { filtersType } from "../../assets/typescript/types/filtersType";

const Home = () => {
  const token = useContext(TokenContext);
  // Real estates
  const [realEstates, setRealEstates] = useState<realEstateType[]>([]);
  const [isRealEstatesLoading, setIsRealEstatesLoading] = useState(false);
  const [realEstatesError, setRealEstatesError] = useState("");
  // selected Filters
  const savedFilters = localStorage.getItem("filters");
  const [selectedFilters, setSelectedFilters] = useState<filtersType | null>(
    savedFilters && savedFilters !== "undefined"
      ? JSON.parse(savedFilters)
      : null
  );
  const [isAnyFilterSelected, setIsAnyFilterSelected] = useState(false);

  // filtered Estates
  const [filteredEstates, setFilteredEstates] = useState<realEstateType[]>([]);
  useEffect(() => {
    const filtered = realEstates.filter((estate) => {
      // If No Filters Are selected return estate
      if (!isAnyFilterSelected || !selectedFilters) return estate;
      // filter estate
      const filteredPrice =
        estate.price > Number(selectedFilters.minPrice) &&
        estate.price < Number(selectedFilters.maxPrice);
      const filteredArea =
        estate.area > Number(selectedFilters.minArea) &&
        estate.area < Number(selectedFilters.maxArea);
      const filteredRegions = selectedFilters.selectedRegions.includes(
        estate.city.region_id
      );
      const filteredBedrooms =
        estate.bedrooms === Number(selectedFilters.bedrooms);

      if (filteredPrice || filteredArea || filteredRegions || filteredBedrooms)
        return estate;
    });

    setFilteredEstates(filtered);
  }, [realEstates, selectedFilters, isAnyFilterSelected]);

  // Set No Selected Filter
  useEffect(() => {
    if (!selectedFilters || selectedFilters === null) {
      setIsAnyFilterSelected(false);
    } else if (
      selectedFilters.selectedRegions.length > 0 ||
      selectedFilters.minPrice ||
      selectedFilters.maxPrice ||
      selectedFilters.minArea ||
      selectedFilters.maxArea ||
      selectedFilters.bedrooms
    ) {
      setIsAnyFilterSelected(true);
    } else {
      setIsAnyFilterSelected(false);
    }
  }, [selectedFilters]);

  // Get Real Estates
  useEffect(() => {
    getRealEstates(
      setIsRealEstatesLoading,
      token,
      setRealEstates,
      setRealEstatesError
    );
  }, [token]);

  return (
    <div className="mx-36 mt-16 mb-14">
      {/* Filtering Card */}
      <section className="mb-8">
        <FilteringCard
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          isAnyFilterSelected={isAnyFilterSelected}
        />
      </section>
      {/* Showing Estates */}
      {isRealEstatesLoading ? (
        <LoadingCard />
      ) : realEstatesError ? (
        <span className="text-errColor">Error: {realEstatesError}</span>
      ) : filteredEstates.length > 0 ? (
        <section className="grid grid-cols-autoFillEstateCard justify-around gap-5">
          {filteredEstates.map((realEstate) => (
            <Link to={`/real-estates/${realEstate.id}`} key={realEstate.id}>
              <RealEstateCard realEstate={realEstate} />
            </Link>
          ))}
        </section>
      ) : (
        // Show Message if either there is no real estate or filtered estate
        <div className=" mt-10">
          <span className="text-deepBlue text-opacity-80 text-lg">
            {realEstates.length === 0
              ? "განცხადებები ჯერ არ დაგიმატებიათ"
              : "აღნიშნული მონაცემებით განცხადება არ იძებნება"}
          </span>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Home;
