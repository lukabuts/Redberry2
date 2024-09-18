import { Link } from "react-router-dom";
import RealEstateCard from "../../components/RealEstateCard/RealEstateCard";
import SimilarRealEstatesCardInterface from "../../assets/typescript/interfaces/similarRealEstatesCardInterface";

const SimilarRealEstatesCard = ({
  isRealEstatesLoading,
  realEstatesError,
  similarRealEstates,
}: SimilarRealEstatesCardInterface) => {
  return (
    <div className="my-14">
      <h3 className="text-deepblue font-bold text-3xl mb-10">
        ბინები მსგავს ლოკაციაზე
      </h3>
      {isRealEstatesLoading ? (
        <span className="text-deepBlue opacity-70 text-lg">იტვირთება...</span>
      ) : realEstatesError ? (
        <span className="text-errColor">Error: {realEstatesError}</span>
      ) : similarRealEstates.length === 0 ? (
        <span className="text-deepBlue opacity-70 text-lg">
          ბინები მსგავს ლოკაციაზე არ მოიძებნა
        </span>
      ) : (
        <div className="flex gap-5 flex-nowrap w-full overflow-hidden">
          {similarRealEstates.map((estate) => (
            <Link to={`/real-estates/${estate.id}`} key={estate.id}>
              <RealEstateCard realEstate={estate} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimilarRealEstatesCard;
