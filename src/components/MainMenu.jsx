import React, { Component } from "react";

import { FlexboxGrid, Button } from "rsuite";

class MainMenu extends Component {
  render() {
    return (
      <FlexboxGrid className="main-menu" align="middle" justify="space-around">
        <FlexboxGrid.Item>
          <Button appearance="primary" href="/room/create" size="lg">
            Create Room
          </Button>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <Button appearance="ghost" href="/room/join" size="lg">
            Join Room
          </Button>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  }
}

export default MainMenu;
