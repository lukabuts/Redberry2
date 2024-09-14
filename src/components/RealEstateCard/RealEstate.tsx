import testImage from "../../assets/images/delete_this.png";
import locationIcon from "../../assets/images/location_marker.svg";
import bedIcon from "../../assets/images/bed.svg";
import areaIcon from "../../assets/images/area.svg";
import postIcon from "../../assets/images/post_code.svg";
const RealEstateCard = () => {
  return (
    <div className="relative hover:shadow-md transition-all rounded-xl overflow-hidden">
      <div className="h-80 overflow-hidden flex justify-center items-center">
        <img
          src={testImage}
          alt="Real estate image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="border border-lightGray rounded-b-xl p-5">
        <div>
          <h2 className="f font-bold text-2xl">80 000 ₾</h2>
        </div>
        <div className="flex items-center gap-1 mb-4 mt-1.5">
          <img src={locationIcon} alt="Location" className="w-5 h-5" />
          <span className="text-deepBlue opacity-70 text-sm">
            თბილისი, ი.ჭავჭავაძის 53
          </span>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1">
            <img className="w-5 h-5" src={bedIcon} alt="Rooms" />
            <span className="text-deepBlue opacity-70 text-sm">2</span>
          </div>
          <div className="flex items-center gap-1">
            <img className="w-5 h-5" src={areaIcon} alt="Area" />
            <span className="text-deepBlue opacity-70 text-sm">55 მ²</span>
          </div>
          <div className="flex items-center gap-1">
            <img className="w-5 h-5" src={postIcon} alt="Post Code" />
            <span className="text-deepBlue opacity-70 text-sm">0160</span>
          </div>
        </div>
      </div>
      <div className="absolute top-6 left-6 bg-deepBlue bg-opacity-50 py-1.5 px-2.5  rounded-3xl">
        <span className="text-white text-xs font-medium">იყიდება</span>
      </div>
    </div>
  );
};

export default RealEstateCard;
