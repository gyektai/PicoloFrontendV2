import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './static/Selector.css';
import AddPlayers from "./AddPlayers";

class Selector extends Component {
	constructor(props){
		super(props);
		const colors = ['green', 'orange', 'blue', 'pink', 'purple', 'cyan'];
    	const randColor = Math.floor(Math.random() * colors.length);
    	this.bgColor = colors[randColor]
    	this.allDecks = [];
		this.state = {
			deck: "",
			players: ['Gideon', 'Spencer']
		};

	}

	componentDidMount() {
	    axios.get('https://gyektai.pythonanywhere.com/api/decks/')
	      .then(res => {
	        let decks = res.data;
	        for(let i = 0; i < decks.length; i++){
	        	this.allDecks.push(decks[i].title);
	        }
	       	this.setState({
	       		deck: "Quick Play"
	       	});
	      // this.cleanDB(); // only to delete all elements in the database

      })


  	}

	handlePick = (deckName) => {
		this.setState(state => ({
			deck: deckName,
		}));
	}

	// used to clear the database completely. Probably pretty dangerous lol
	cleanDB = () => {
		let deck = 1;
		for(let i = 1; i < this.allDecks.length; i++){
			deck = this.allDecks[i];
			// not a comment below
			axios.delete(`https://gyektai.pythonanywhere.com/api/cards/${deck}`);

		}
	}

	render() {
		const deckButtons = [];
		for(let i = 0; i < 10; i++){
			const curDeck = this.allDecks[i];
			if(curDeck === this.state.deck){
				deckButtons.push(
					<button
					onClick={() => this.handlePick(curDeck)}
					className={`deck-option deck-selected bg-${this.bgColor}`}
					key={curDeck}
					>
					&#9733; &nbsp; {curDeck} &nbsp; &#9733;
					</button>
					);
			} else {
			deckButtons.push(
				<button 
				onClick={() => this.handlePick(curDeck)} 
				className={`deck-option bg-${this.bgColor}`}
				key={curDeck+`${i}`}
				>
				{curDeck}
				</button>
				);
		}
		}

		return (
			<div className={`fill-window bg-${this.bgColor}`}>				
				{deckButtons}
				<Link to={`/play/${this.state.deck}/${this.state.players}`} className="play-link">PLAY &rarr;</Link>
				<AddPlayers />
			</div>
			)
	}
}

export default Selector;