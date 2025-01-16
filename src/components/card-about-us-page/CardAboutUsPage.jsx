import "./CardAboutUsPage.scss";

function Card({ mainText, descText, sourcePhoto }) {
  
  return (
    <div className="card">
      <h3>{mainText}</h3>
      <hr />
      <img src={sourcePhoto} alt="Image description" />
      <p>{descText}</p>
    </div>
  );
}

export default Card;
