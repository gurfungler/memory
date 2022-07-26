import "./styles/Header.css";
function Header(props) {
  return (
    <header className="container">
      <div className="score">score: {props.score}</div>
      <div className="score">Highscore: {props.highscore}</div>
    </header>
  );
}

export default Header;
