import React, { Component } from "react";
import "rsuite/dist/styles/rsuite.min.css";
import "./App.css";

import { Icon } from "rsuite";

import Sidebar from "./components/Sidebar";

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
          <h1>Hey</h1>
        </div>
      </div>
    );
  }
}

export default App;
