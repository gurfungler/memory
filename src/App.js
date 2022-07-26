import { useState } from "react";
import Header from "./components/Header";
import Deck from "./components/Deck";
import "./components/styles/App.css";
function App() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const scoreHandler = () => {
    setScore(score + 1);
  };
  function highscoreHandler() {
    setScore(0);
    if (score > highscore) {
      setHighscore(score);
    }
  }

  return (
    <div className="App">
      <Header score={score} highscore={highscore} />
      <Deck addScore={scoreHandler} setHighscore={highscoreHandler} />
    </div>
  );
}

export default App;
