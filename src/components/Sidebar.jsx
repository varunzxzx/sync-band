import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import { Sidenav, Nav, Icon } from "rsuite";

const navs = [
  {
    key: 1,
    name: "Home",
    link: "/",
    icon: "home"
  },
  {
    key: 2,
    name: "Add Song",
    link: "/add-song",
    icon: "plus-square"
  },
  {
    key: 3,
    name: "List Songs",
    link: "/list",
    icon: "pencil"
  },
  {
    key: 4,
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
            <img src="/logo.png" alt="logo" width="50px" />
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
