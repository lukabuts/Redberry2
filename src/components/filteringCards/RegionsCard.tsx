import { useContext } from "react";
import dropDownIcon from "../../assets/images/dropdown.svg";
import RegionsCardProps from "../../assets/typescript/interfaces/regionsCardInterface";
import { IsRegionsInfoLoadingContext, RegionsContext } from "../../App";

const RegionsCard = ({
  showRegionFilter,
  shownFilterPopUP,
  setSelectedRegions,
  selectedRegions,
}: RegionsCardProps) => {
  const regions = useContext(RegionsContext);
  const isRegionsInfoLoading = useContext(IsRegionsInfoLoadingContext);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    if (
      !selectedRegions.find((regId) => regId === id) &&
      e.target.checked === true
    ) {
      setSelectedRegions([...selectedRegions, id]);
    }
    if (
      selectedRegions.find((regId) => regId === id) &&
      e.target.checked === false
    ) {
      const filteredRegions = selectedRegions.filter((regId) => regId !== id);
      setSelectedRegions(filteredRegions);
    }
  }
  return (
    <div className="relative">
      <button
        onClick={showRegionFilter}
        className="flex items-center gap-1 font-bold px-3.5 py-2 hover:bg-softGray transition-colors rounded"
      >
        <span>რეგიონი</span>
        <img src={dropDownIcon} className="w-3.5 h-3.5" alt="Dropdown" />
      </button>

      {isRegionsInfoLoading && shownFilterPopUP ? (
        <div className="absolute left-0 mt-5 border border-lightGray bg-white p-6 rounded-lg z-50">
          <span>Loading...</span>
        </div>
      ) : (
        shownFilterPopUP === "region" && (
          <div className="absolute flex flex-col left-0 mt-5 border border-lightGray bg-white p-6 rounded-lg z-50">
            <div className="mb-6">
              <p className="text-deepBlue font-bold text-base">
                რეგიონის მიხედვით
              </p>
            </div>
            <div className="grid grid-cols-3 w-max gap-x-14 gap-y-2">
              {regions.map((region) => (
                <button key={region.id} className="shrink-0 py-1">
                  <label
                    htmlFor={String(region.id)}
                    className="cursor-pointer flex gap-2 items-center"
                  >
                    <input
                      type="checkbox"
                      name="region"
                      value={region.name}
                      id={String(region.id)}
                      className=" w-5 h-5 border border-lightGray cursor-pointer accent-green-500"
                      onChange={(e) => {
                        handleChange(e, region.id);
                      }}
                      checked={selectedRegions.some(
                        (regId) => regId === region.id
                      )}
                    />
                    <span className="text-deepBlue">{region.name}</span>
                  </label>
                </button>
              ))}
            </div>
            <div className="self-end mt-6">
              <button className="bg-flameRed hover:bg-hoveredFlameRed text-white text-base font-bold rounded-lg px-3.5 py-2 transition-colors">
                არჩევა
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default RegionsCard;
