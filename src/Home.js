import React, { Component } from "react";
import { Link } from "react-router-dom";
import './static/Home.css';

class Home extends React.Component {

  render() {

    return (

        <div className="bg-pink fill-window">
          <div className="tc-txt tc-top">It&apos;s <span style={{fontSize: 180}}>Picolo</span>,</div>
          <div className="tc-txt tc-bot">Mofo!</div>
          <Link to='/deck-selector' className="btn-play">PLAY &rarr;</Link>
        </div>

      )
  }
}
export default Home;
