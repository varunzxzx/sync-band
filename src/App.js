import React, { Component } from "react";
import { Router } from "@reach/router";
import AddSong from "./components/AddSong/AddSong";
import ListSong from "./components/ListSong/ListSong";
import "rsuite/dist/styles/rsuite.min.css";
import "./App.css";

import { Icon } from "rsuite";

import Sidebar from "./components/Sidebar";
import MainMenu from "./components/MainMenu";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    };
  }

  toggleNav = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const { expanded } = this.state;
    return (
      <div className="App">
        {expanded && <Sidebar />}
        <Icon
          onClick={this.toggleNav}
          className="menu-btn"
          icon="bars"
          size="2x"
        />
        <div id="main-app">
          <Router>
            <MainMenu path="/" />
            <AddSong path="/add-song" />
            <ListSong path="/list" />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
