import React, { Component } from "react";
import {
  doesRoomExists,
  createRoom,
  changeSong,
  exitRoom,
  syncSongsWithServer
} from "../../api";
import { navigate } from "@reach/router";
import ListSong from "../ListSong/ListSong";
import { fetchSongs } from "../../utils";

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "join",
      song: null,
      loading: true
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

    fetchSongs((err, songs) => {
      if (err) {
        return alert("Something went wrong while fetching songs");
      }

      syncSongsWithServer(songs).then(() => {
        doesRoomExists(this.changeSongHandler, songs).then(res => {
          roomExists = res.data;
          this.setState({
            loading: false
          });
        });
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
    const { type, song, loading } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      !loading && (
        <ListSong
          song={song}
          clickHandler={this.clickHandler}
          viewOnly={type !== "create" ? true : false}
        />
      )
    );
  }
}

export default Room;
