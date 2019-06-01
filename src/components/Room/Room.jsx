import React, { Component } from "react";
import {
  doesRoomExists,
  createRoom,
  changeSong,
  exitRoom,
  syncSongsWithServer,
  getUserCount
} from "../../api";
import { navigate } from "@reach/router";
import ListSong from "../ListSong/ListSong";
import { fetchSongs } from "../../utils";
import Loading from "../Loading";

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

  changeUserCount = user_count => {
    this.props.changeUserCount(user_count);
  };

  componentDidMount() {
    const type = this.props.type;
    let roomExists;

    fetchSongs(async (err, songs) => {
      if (err) {
        return alert("Something went wrong while fetching songs");
      }

      syncSongsWithServer(songs, this.changeUserCount).then(() => {
        doesRoomExists(this.changeSongHandler).then(async res => {
          roomExists = res.data;
          if (type === "create") {
            if (roomExists) {
              alert("Room already exists!!");
              navigate("/");
            } else {
              createRoom();
            }
          }
          getUserCount();
          this.setState({
            loading: false,
            type
          });
        });
      });
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
      return <Loading />;
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
