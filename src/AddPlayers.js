import React, { Component } from "react";
import './static/AddPlayers.css';

class AddPlayers extends Component {
	constructor(props){
		super(props);
		this.state = {
			allPlayers: [],
			name: ""
		}
	}

	handleOnInputChange = event => {
		const player = event.target.value;
		this.setState(state => ({
			name: player
		}));
	}

	keyPress = (event) => {
		if (event.key === 'Enter') {
			this.handleAddPlayer();
		}
	}

	handleAddPlayer = () => {
		const newPlayers = [this.state.name, ...this.state.allPlayers];
		this.setState(state => ({
			allPlayers: newPlayers,
			name: "",
		}));
		console.log(this.state.allPlayers);
	};

	render() {
		return (
			<div>
				<input
					type="text"
					value={this.state.name}
					id="search-input"
					placeholder="Add Player..."
					onKeyDown={this.keyPress}
					onChange={this.handleOnInputChange} />
		
			</div>
			)
	}
}

export default AddPlayers;