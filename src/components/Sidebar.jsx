import React, { Component } from "react";
import { Sidenav, Nav, Icon } from "rsuite";

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
      <Nav.Item key={nav.key} icon={<Icon icon={nav.icon} />}>
        {nav.name}
      </Nav.Item>
    ));
  };

  render() {
    return (
      <Sidenav className="sidebar">
        <Sidenav.Header>
          <div className="header-hrand">
            <Icon icon="music" size="lg" style={{ verticalAlign: 0 }} />
            <span style={{ marginLeft: 12 }}> Sync Band</span>
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
