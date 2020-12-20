import React, { Component } from "react";
import './static/AddPlayers.css';

class AddPlayers extends Component {
	constructor(props){
		super(props);
		this.state = {
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
			this.props.handleAddPlayer(this.state.name);
			this.setState(state => ({
				name: ""
			}));
		}
	}


	render() {
		return (
			<div className="name-container">
				<input
					type="text"
					value={this.state.name}
					className="name-input"
					placeholder="Add Player..."
					onKeyDown={this.keyPress}
					onChange={this.handleOnInputChange} />
			</div>
			)
	}
}

export default AddPlayers;