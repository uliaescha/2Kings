import Header from "../../header/Header";
import Photo from "../../../assets/img/photo-main-page.png"
import './MainPage.scss';

const photo = Photo;
function MainPage() {
  return (
    <>
      <Header />
      <h1 className="main-font">
        Every great move begins with a single step on the board
      </h1>
      <img src={photo} alt="chess photo" className="photo-main-page" />
    </>
  );
}

export default MainPage;