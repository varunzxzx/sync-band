import React, { Component } from "react";
import { doesRoomExists, createRoom, changeSong } from "../../api";
import { navigate } from "@reach/router";
import ListSong from "../ListSong/ListSong";

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "join",
      song: null
    };
  }

  changeSongHandler = song => {
    this.setState({
      song
    });
  };

  async componentDidMount() {
    const type = this.props.type;
    let roomExists;

    await doesRoomExists(this.changeSongHandler).then(data => {
      roomExists = data.data;
    });

    if (type === "create") {
      if (roomExists) {
        alert("Room already exists!!");
        navigate("/");
      } else {
        createRoom();
      }
    }

    this.setState({ type });
  }

  clickHandler = song => {
    changeSong(song);
  };

  render() {
    const { type, song } = this.state;
    return (
      <ListSong
        song={song}
        clickHandler={this.clickHandler}
        viewOnly={type !== "create" ? true : false}
      />
    );
  }
}

export default Room;
