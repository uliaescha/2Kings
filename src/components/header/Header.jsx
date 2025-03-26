import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import isAuthenticated from "../../utils/auth";
import "./Header.scss";
import photo from '../../assets/img/icon-prf.png';
const icon = photo;
const logotype = logo;
function Header() {

  return (
    <header className="header">
      <nav className="navigation">
        <Link to='/'>
          <img src={logotype} className="navigation-logo" alt="2Kings Logo" />
        </Link>

        <div className="navigation-btns">
          <ul className="navigation-links">
            <li>About us</li>
            <li>Coaches</li>
            <li>Books</li>
          </ul>
          {isAuthenticated() ? (
            <Link to="/profile">
              <img
                src={icon}
                className="navigation-icon-prf"
                alt="icon-profile"
              />
            </Link>
          ) : (
            <Link to="/login">
              <button className="navigation-button">log in</button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
