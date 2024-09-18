import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import {
  IsRealEstatesLoadingContext,
  RealEstatesContext,
  RealEstatesErrorContext,
  TokenContext,
} from "../../App";
import { detailedRealEstateType } from "../../assets/typescript/types/detailedRealEstateType";
import backIcon from "../../assets/images/IconRight.svg";
import { Link } from "react-router-dom";
import { realEstateType } from "../../assets/typescript/types/realEstateType";
import DetailedRealEstateCard from "../../components/ListingCards/DetailedRealEstateCard";
import DetailedRealEstatePopUp from "../../components/ListingCards/DetailedRealEstatePopUp";
import SimilarRealEstatesCard from "../../components/ListingCards/SimilarRealEstatesCard";

const Listing = () => {
  const location = useLocation();
  // Get Estate Id
  const { id } = useParams<{ id: string }>();
  // Get Token
  const token = useContext(TokenContext);
  // Real estate
  const [realEstate, setRealEstate] = useState<detailedRealEstateType>();
  const [isRealEstateLoading, setIsRealEstateLoading] = useState(true);
  const [realEstateError, setRealEstateError] = useState("");
  // Real Estates
  const isRealEstatesLoading = useContext(IsRealEstatesLoadingContext);
  const realEstatesError = useContext(RealEstatesErrorContext);
  const realEstates = useContext(RealEstatesContext);
  // Filtered Real estates
  const [similarRealEstates, setSimilarRealEstates] = useState<
    realEstateType[]
  >([]);

  // Show Popup
  const [showPopUp, setShowPopUp] = useState(false);

  // Get Real Estate
  useEffect(() => {
    setIsRealEstateLoading(true);
    axios
      .get(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setRealEstate(res.data);
      })
      .catch((err) => {
        console.log(err);
        setRealEstateError(err.message);
      })
      .finally(() => {
        setIsRealEstateLoading(false);
      });
  }, [location]);

  // Setting Similar Real Estates
  useEffect(() => {
    const filteredEstates = realEstates.filter((estate) => {
      return (
        estate.city.region_id === realEstate?.city.region_id &&
        estate.id !== realEstate.id
      );
    });

    console.log(filteredEstates);

    setSimilarRealEstates(filteredEstates);
  }, [realEstates, realEstate]);

  return (
    <>
      <div className="mx-36 mt-16">
        {/* Go Back  */}
        <button className="mb-8">
          <Link to="/">
            <img src={backIcon} alt="Go Back" />
          </Link>
        </button>
        {realEstate ? (
          <DetailedRealEstateCard
            realEstate={realEstate}
            realEstateError={realEstateError}
            isRealEstateLoading={isRealEstateLoading}
            setShowPopUp={setShowPopUp}
          />
        ) : (
          !isRealEstateLoading && (
            <span className="text-errColor">უძრავი ქონება ვერ მოიძებნა</span>
          )
        )}
        {/* Similar Real Estates */}
        {!realEstateError && realEstates && !isRealEstateLoading && (
          <SimilarRealEstatesCard
            similarRealEstates={similarRealEstates}
            realEstatesError={realEstatesError}
            isRealEstatesLoading={isRealEstatesLoading}
          />
        )}
      </div>
      {/* Show Notification Before Deleting Real Estate */}
      {showPopUp && <DetailedRealEstatePopUp setShowPopUp={setShowPopUp} />}
    </>
  );
};

export default Listing;
