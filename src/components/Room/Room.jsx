import React, { Component } from "react";
import { doesRoomExists, createRoom, changeSong, exitRoom } from "../../api";
import { navigate } from "@reach/router";
import ListSong from "../ListSong/ListSong";
import { fetchSongs } from "../../utils";

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

  componentDidMount() {
    const type = this.props.type;
    let roomExists;

    fetchSongs(async (err, songs) => {
      if (err) {
        return alert("Something went wrong while fetching songs");
      }

      await doesRoomExists(this.changeSongHandler, songs).then(data => {
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
    });
  }

  clickHandler = song => {
    changeSong(song);
  };

  componentWillUnmount() {
    exitRoom();
  }

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
