import logo from '../../assets/img/logo.png';
import './Header.scss';

const logotype = logo;
function Header() {
  return (
    <header className="header">
      <nav className="navigation">
        <img src={logotype} className="navigation-logo" alt="2Kings Logo" />
        <div className="navigation-btns">
          <ul className="navigation-links">
            <li>About us</li>
            <li>Coaches</li>
            <li>Books</li>
          </ul>
          <button className="navigation-button">log in</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;