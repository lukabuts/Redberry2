import { Link } from "react-router-dom";
import redberryLogo from "../../assets/images/redberry_logo.svg";

const Header = () => {
  return (
    <header className="px-40 py-10 border-b border-lightGray">
      <Link to="/">
        <img src={redberryLogo} alt="Redberry Logo" />
      </Link>
    </header>
  );
};

export default Header;
