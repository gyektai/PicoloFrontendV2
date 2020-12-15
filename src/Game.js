import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './static/Game.css';
import { Transition, animated, Spring, config } from 'react-spring/renderprops';


class Game extends Component {
  constructor(props) {
    super(props);
    this.deckTitle = this.props.match.params.title;
    this.allCards = ['START!'];
    this.colors = ['green', 'orange', 'blue', 'pink', 'purple', 'cyan'];
    this.cardsPlayed = [];
    this.numCardsPlayed = 0;
    const randCard = Math.floor(Math.random() * this.allCards.length);
    const randColor = Math.floor(Math.random() * this.colors.length);
    this.state = {
      cardNum: randCard,
      card: this.allCards[0],
      bgColor: randColor,
    };
  }

  componentDidMount() {
    // not a comment below. inside backticks
    axios.get(`https://gyektai.pythonanywhere.com/api/decks/${this.deckTitle}`)
      .then(res => {
        const myDeck = res.data;
        this.allCards = [];
        for(let i=0; i < myDeck.cards.length; i++){
          axios.get(`https://gyektai.pythonanywhere.com/api/cards/${myDeck.cards[i]}`)
            .then(r => {
              this.allCards.push(r.data.present);
            })
        }
      })
  }

  handleNextCard = () => {
    const addToCard = Math.floor(Math.random() * 3) + 1;
    const addToColor= Math.floor(Math.random() * 3) + 1;
    const newCardIndex = (this.state.cardNum + addToCard) % this.allCards.length;
    const newColorIndex = (this.state.bgColor + addToColor) % this.colors.length;

    if (this.numCardsPlayed === 10){
      this.setState(state => ({
        card: "Good round!",
        bgColor: newColorIndex
      }));
    }
    else {
      this.setState(state => ({
        cardNum: newCardIndex,
        card: this.allCards[newCardIndex],
        bgColor: newColorIndex,
      }));
      this.numCardsPlayed++;

    }

    this.allCards.splice(newCardIndex,1);
  }

  render() {
    const color = this.colors[this.state.bgColor]
    return (

      <div className={`stretch fill-window bg-${color}`}>
       {/* just for easy nav right now*/}
        <Link to='/' style={{color: "white"}}>Take me home tonight</Link> 
        <Spring
          from={{ right: 100, width: '87.333%', fontSize: 50 }}
          to={{ right: 0, width: '100%', fontSize: 60 }}
          config={ config.wobbly }
          key={this.state.card}
        >
          {props => (
            <div className="card-container" style={props}>
              <div className="card-label" style={props}>{this.state.card}</div>
            </div>
        )}
        </Spring>

        <button className={`next-card-btn bg-${color}`} onClick={this.handleNextCard}>NEXT CARD</button>
      </div>
    );
  }
}

export default Game;
