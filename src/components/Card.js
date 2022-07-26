import "./styles/Card.css";
function Card({ card, checkCard, imgSrc, cardName }) {
  return (
    <div className="card" onClick={() => checkCard(card)}>
      <div className="property-card">
        <img src={imgSrc} alt={Math.random()} />
        <h5> {cardName}</h5>
      </div>
    </div>
  );
}
export default Card;
