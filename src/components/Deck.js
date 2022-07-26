import { useState, useEffect } from "react";
import Card from "./Card.js";
import "./styles/Deck.css";

function Deck({ addScore, setHighscore }) {
  const [seenCards, setSeenCards] = useState([]);
  const [generatedCards, setGeneratedCards] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [names, setNames] = useState([]);
  const [numberOfCards, setNumberOfCards] = useState(3);

  const newDeck = () => {
    let newDeck = [];
    for (let i = 0; i < numberOfCards; ++i) {
      let rand = Math.floor(Math.random() * 151) + 1; //151 is pokedex length

      if (i === numberOfCards - 1) {
        while (seenCards.includes(rand) || generatedCards.includes(rand)) {
          rand = Math.floor(Math.random() * 151) + 1; //makes sure that the last card is a non seen card
        }
      }
      newDeck.push(rand);
    }
    setGeneratedCards([...newDeck]);
  };

  const randomizeDeck = () => {
    let newDeck = [...generatedCards];
    newDeck.sort((a, b) => 0.5 - Math.random()); //randomizes the deck
    setGeneratedCards(newDeck);
  };

  const checkCard = (index) => {
    if (!seenCards.includes(index)) {
      setSeenCards([...seenCards, index]); //checks if card has been clicked
      addScore();
    } else {
      setHighscore();
      setSeenCards([]);
      setNumberOfCards(3);
    }
    if (generatedCards.length === seenCards.length + 1) {
      setNumberOfCards(numberOfCards + 1); //after you choose all cards correctly it updates number of cards which triggers the useEffect call
    }
    randomizeDeck();
  };

  useEffect(() => {
    newDeck();
  }, []); //generates new deck on starting render

  useEffect(() => {
    async function fetchData() {
      let images = [];
      let nmes = [];
      for (let i = 0; i < numberOfCards; ++i) {
        let response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${generatedCards[i]}`
        );
        let data = await response.json();
        let newName = data.name;
        let sprite = data.sprites;
        let imgSrc = sprite.front_default;
        nmes.push(newName);
        images.push(imgSrc);
      }
      setNames(nmes);
      setImgUrl(images);
    }
    fetchData([]);
  }, [generatedCards]); //when generate cards updates it pulls images from the api

  useEffect(() => {
    setSeenCards([]);
    newDeck();
  }, [numberOfCards]); //every time number of cards updates it resets set seen cards and generates a new deck

  return (
    <div className="centered">
      {[...new Array(numberOfCards)].map((e, index) => (
        <Card
          key={index}
          card={generatedCards[index]}
          checkCard={checkCard}
          imgSrc={imgUrl[index]}
          cardName={names[index]}
        />
      ))}
    </div>
  );
}

export default Deck;
