import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import { Sidenav, Nav, Icon } from "rsuite";
import logo from "../logo.svg";
import { syncSongs } from "../utils";

const navs = [
  {
    key: 1,
    name: "Add Song",
    link: "/add-song",
    icon: "plus-square"
  },
  {
    key: 2,
    name: "List Songs",
    link: "/list",
    icon: "pencil"
  },
  {
    key: 3,
    name: "Settings",
    link: "/settings",
    icon: "cogs"
  }
];

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: null
    };
  }

  renderNavItems = () => {
    return navs.map(nav => (
      <Nav.Item
        componentClass={Link}
        key={nav.key}
        eventKey={nav.key}
        to={nav.link}
        icon={<Icon icon={nav.icon} />}
      >
        {nav.name}
      </Nav.Item>
    ));
  };

  returnHome = () => {
    this.props.toggleNav();
    navigate("/");
  };

  onSelect = activeKey => {
    this.setState({
      activeKey
    });
    this.props.toggleNav();
  };

  sync = () => {
    this.props.toggleNav();
    syncSongs();
  };

  render() {
    const { activeKey } = this.state;
    return (
      <Sidenav
        onSelect={this.onSelect}
        activeKey={activeKey}
        className="sidebar"
      >
        <Sidenav.Header>
          <div className="header-hrand">
            <img src={logo} alt="logo" width="50px" />
            <span onClick={this.returnHome} style={{ marginLeft: 12 }}>
              Sync Band
            </span>
          </div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            {this.renderNavItems()}
            <Nav.Item
              key={navs.length + 1}
              eventKey={navs.length + 1}
              icon={<Icon icon="refresh" />}
              onClick={this.sync}
            >
              Sync
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    );
  }
}

export default Sidebar;
