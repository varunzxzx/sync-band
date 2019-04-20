import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import { Sidenav, Nav, Icon } from "rsuite";
import logo from "../logo.svg";

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
    link: "/setting",
    icon: "cogs"
  }
];

class Sidebar extends Component {
  renderNavItems = () => {
    return navs.map(nav => (
      <Nav.Item
        componentClass={Link}
        key={nav.key}
        to={nav.link}
        icon={<Icon icon={nav.icon} />}
      >
        {nav.name}
      </Nav.Item>
    ));
  };

  returnHome = () => {
    navigate("/");
  };

  render() {
    return (
      <Sidenav className="sidebar">
        <Sidenav.Header>
          <div className="header-hrand">
            <img src={logo} alt="logo" width="50px" />
            <span onClick={this.returnHome} style={{ marginLeft: 12 }}>
              Sync Band
            </span>
          </div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>{this.renderNavItems()}</Nav>
        </Sidenav.Body>
      </Sidenav>
    );
  }
}

export default Sidebar;
