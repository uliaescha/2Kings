import './AboutUs.scss';
import Card from '../../../components/card-about-us-page/CardAboutUsPage'
import photo from '../../../assets/img/queen.png';
function AboutUs() {
    const queen = photo;
    return (
      <section id="about-us">
        <div className="texts">
          <h1>About us</h1>
          <h2>
            2Kings Chess Club was established in 2015 by a group of chess
            enthusiasts who aimed to bring together people of all ages
            passionate about chess.
          </h2>
          <h3>
            Our mission is to promote chess as the art of strategic thinking, to
            nurture a new generation of chess players, and to create a friendly
            community for playing and learning.
          </h3>
        </div>
        <div className="image-container">
          <img src={queen} alt="queen" />
          <div className="annotation annotation-top-left">
            <span>Strategic thinking and leadership</span>
            <div className="line"></div>
          </div>
          <div className="annotation annotation-top-right">
            <span>Education and growth</span>
            <div className="line"></div>
          </div>
          <div className="annotation annotation-bottom-left">
            <span>Support and community</span>
            <div className="line"></div>
          </div>
          <div className="annotation annotation-bottom-right">
            <span>Fairness and sportsmanship</span>
            <div className="line"></div>
          </div>
        </div>
        <div className="cards">
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    );
}

export default AboutUs;