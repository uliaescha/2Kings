import Header from "../../components/header/Header";
import Photo from "../../assets/img/photo-main-page.png"
import './MainPage.scss';
import AboutUs from "../../components/about-us/AboutUs";

const photo = Photo;
function MainPage() {
  return (
    <div className="main-page">
      <Header />
      <h1 className="main-font">
        Every great move begins with a single step on the board
      </h1>
      <img src={photo} alt="chess photo" className="photo-main-page" />
      <AboutUs/>
    </div>
  );
}

export default MainPage;