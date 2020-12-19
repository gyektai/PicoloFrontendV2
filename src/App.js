import './static/Game.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Game";
import Home from "./Home";
import Selector from "./Selector";


class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/play/:title/:names" component={Game} />
            <Route path="/deck-selector" component={Selector} />
          </Switch>
        </div>
      </Router>
      )
  }
}

export default App;
