import React, { Component } from "react";
import { Router } from "@reach/router";
import Loadable from "react-loadable";
import "rsuite/dist/styles/rsuite.min.css";
import "./App.css";
import { openDB } from "idb";

import { Icon } from "rsuite";

import Sidebar from "./components/Sidebar";
import MainMenu from "./components/MainMenu";
import Loading from "./components/Loading";

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

const AsyncAddSong = Loadable({
  loader: () => import("./components/AddSong/AddSong.jsx"),
  loading: Loading
});

const AsyncListSong = Loadable({
  loader: () => import("./components/ListSong/ListSong"),
  loading: Loading
});

const AsyncRoom = Loadable({
  loader: () => import("./components/Room/Room"),
  loading: Loading
});

const AsyncSettings = Loadable({
  loader: () => import("./components/Settings"),
  loading: Loading
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      isOffline: false,
      ip: ""
    };
  }

  toggleNav = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  changeMode = ip => {
    this.setState({
      isOffline: true,
      ip
    });
    window.ip = ip;
  };

  render() {
    const { expanded, isOffline, ip } = this.state;
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
              <AsyncAddSong path="/add-song" />
              <AsyncListSong path="/list" />
              <AsyncRoom path="/room/:type" />
              <AsyncSettings
                path="/settings"
                ip={ip}
                isOffline={isOffline}
                changeMode={this.changeMode}
              />
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
