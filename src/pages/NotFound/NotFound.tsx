import { Link } from "react-router-dom";
import FilledButtonCard from "../../components/Buttons/FilledButtonCard";

const NotFound = () => {
  return (
    <div className="absolute top-0 flex flex-col items-center justify-center w-full h-full gap-5">
      <h1 className="text-4xl">გვერდი ვერ მოიძებნა</h1>
      <Link to="/">
        <FilledButtonCard>დამაბრუნე მთავარ გვერდზე</FilledButtonCard>
      </Link>
    </div>
  );
};

export default NotFound;
