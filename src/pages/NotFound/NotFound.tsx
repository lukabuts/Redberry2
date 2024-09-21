import { Link } from "react-router-dom";
import FilledButtonCard from "../../components/Buttons/FilledButtonCard";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-20">
      <h1 className="text-4xl">გვერდი ვერ მოიძებნა</h1>
      <Link to="/">
        <FilledButtonCard>დამაბრუნე მთავარ გვერდზე</FilledButtonCard>
      </Link>
    </div>
  );
};

export default NotFound;
