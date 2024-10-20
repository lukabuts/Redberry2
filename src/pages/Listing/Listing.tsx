import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { detailedRealEstateType } from "../../assets/typescript/types/detailedRealEstateType";
import { Link } from "react-router-dom";
import { realEstateType } from "../../assets/typescript/types/realEstateType";
import DetailedRealEstateCard from "../../components/ListingCards/DetailedRealEstateCard";
import DetailedRealEstatePopUp from "../../components/ListingCards/DetailedRealEstatePopUp";
import SimilarRealEstatesCard from "../../components/ListingCards/SimilarRealEstatesCard";
import { getRealEstates } from "../../utils/getRealEstates";
import { TokenContext } from "../../App";
import ArrowIcon from "../../components/Icons/ArrowIcon";
import { Helmet } from "react-helmet-async";

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
  // Real estates
  const [realEstates, setRealEstates] = useState<realEstateType[]>([]);
  const [isRealEstatesLoading, setIsRealEstatesLoading] = useState(false);
  const [realEstatesError, setRealEstatesError] = useState("");
  // Filtered Real estates
  const [similarRealEstates, setSimilarRealEstates] = useState<
    realEstateType[]
  >([]);

  // Show Popup
  const [showPopUp, setShowPopUp] = useState(false);

  // Get Real Estate With Id
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

  // Get Real Estates
  useEffect(() => {
    getRealEstates(
      setIsRealEstatesLoading,
      token,
      setRealEstates,
      setRealEstatesError
    );
  }, []);

  // Setting Similar Real Estates
  useEffect(() => {
    const filteredEstates = realEstates.filter((estate) => {
      return (
        estate.city.region_id === realEstate?.city.region_id &&
        estate.id !== realEstate.id
      );
    });

    setSimilarRealEstates(filteredEstates);
  }, [realEstates, realEstate]);

  return (
    <>
      <Helmet>
        <title>
          {`${realEstate?.description} - ${realEstate?.agent.name}`}
        </title>
      </Helmet>
      {/* Go Back  */}
      <button className="mb-8 ml-36 mt-16">
        <Link to="/">
          <ArrowIcon />
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
          <div className="text-center">
            <span className="text-errColor text-xl">
              უძრავი ქონება ვერ მოიძებნა
            </span>
          </div>
        )
      )}
      {/* Similar Real Estates */}
      {!realEstateError && realEstates && !isRealEstateLoading && (
        <div className="relative">
          <SimilarRealEstatesCard
            similarRealEstates={similarRealEstates}
            realEstatesError={realEstatesError}
            isRealEstatesLoading={isRealEstatesLoading}
          />
        </div>
      )}
      {/* Show Notification Before Deleting Real Estate */}
      {showPopUp && <DetailedRealEstatePopUp setShowPopUp={setShowPopUp} />}
    </>
  );
};

export default Listing;
