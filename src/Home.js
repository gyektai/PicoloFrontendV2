import React, { Component } from "react";
import { Link } from "react-router-dom";
import './static/Home.css';
import { Spring, config } from 'react-spring/renderprops'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
    	animDone: false
    }
  }

  endAnimation = () => {
  	console.log("Done");
  	this.setState({
  		animDone: true
  	})
  }



  render() {

	    return (
		  <div className="bg-pink fill-window">
		    <Spring
		      from={{ fontSize: 90 }}
		      to={{ fontSize: 140 }}
		      config={{ tension: 200, friction: 5}}
		    >
		      {props => (
				<div>
				  <div className="tc-txt tc-top" style={props}>It&apos;s <span style={{ fontSize: props.fontSize*1.6}}>Picolo</span>,</div>
				  <div className="tc-txt tc-bot" style={props}>Mofo!</div>
				</div>
		      )}
			</Spring>
		    <Link to='/deck-selector' className="btn-play">PLAY &rarr;</Link>
		  </div>

	    )
  	}

}
export default Home;
