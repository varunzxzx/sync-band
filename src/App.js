import React, { Component } from "react";
import { Router } from "@reach/router";
import AddSong from "./components/AddSong/AddSong";
import ListSong from "./components/ListSong/ListSong";
import Room from "./components/Room/Room";
import "rsuite/dist/styles/rsuite.min.css";
import "./App.css";
import { openDB } from "idb";

import { Icon } from "rsuite";

import Sidebar from "./components/Sidebar";
import MainMenu from "./components/MainMenu";

function syncDB() {
  if (!("indexedDB" in window)) {
    alert("This browser doesn't support IndexedDB");
    return;
  }

  window.dbPromise = openDB("sync-band", 1, {
    upgrade(upgradeDb) {
      console.log("making a new object store");
      if (!upgradeDb.objectStoreNames.contains("songs")) {
        upgradeDb.createObjectStore("songs");
      }
    }
  });
}

syncDB();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
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
        {expanded && <Sidebar toggleNav={this.toggleNav} />}
        <div id="container">
          <div>
            <Icon
              onClick={this.toggleNav}
              className="menu-btn"
              icon="bars"
              size="2x"
            />
          </div>
          <div id="main-app">
            <Router>
              <MainMenu path="/" />
              <AddSong path="/add-song" />
              <ListSong path="/list" />
              <Room path="/room/:type" />
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
