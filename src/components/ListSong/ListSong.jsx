import React, { Component } from "react";

import { Table, Modal, Button, ButtonGroup } from "rsuite";

import { fetchSongs } from "../../utils";

import "./ListSong.css";
import ViewSong from "../ViewSong/ViewSong";
import AddSong from "../AddSong/AddSong";
import Loading from "../Loading";
import { getSchedule } from "../../api";
const { Column, Cell, HeaderCell } = Table;

class ListSong extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      filteredSongs: [],
      loading: true,
      selectedSong: null,
      showModal: false,
      editMode: false,
      schedule: [],
      view: "all"
    };
  }

  onModalHide = () => {
    this.setState({
      showModal: false
    });
  };

  changeView = view => {
    let { songs, schedule } = this.state;
    let filteredSongs;
    if (view !== "all") {
      filteredSongs = songs
        .filter(song => schedule.indexOf(song.id) !== -1)
        .map((song, i) => {
          return { ...song, sno: i + 1 };
        });
      console.log(filteredSongs);
      view = "schedule";
    } else {
      filteredSongs = songs;
      view = "all";
    }
    this.setState({ filteredSongs, view });
  };

  changeMode = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  onSongClick = song => {
    if (this.props.viewOnly) {
      return;
    }
    if (this.props.clickHandler) {
      this.props.clickHandler(song);
    }
    this.setState({
      selectedSong: song,
      showModal: true
    });
  };

  componentDidMount() {
    fetchSongs(async (err, songs) => {
      if (err) {
        return alert("Something went wrong while fetching songs");
      }
      const songsWithIndex = songs.map((song, i) => {
        return { ...song, sno: i + 1 };
      });
      const { data: schedule } = await getSchedule();
      this.setState({
        songs: songsWithIndex,
        filteredSongs: songsWithIndex,
        loading: false,
        schedule
      });
    });
  }

  componentDidUpdate() {
    if (this.props.song && this.props.song !== this.state.selectedSong) {
      this.setState({
        selectedSong: this.props.song,
        showModal: true
      });
    }
  }

  render() {
    const { filteredSongs, loading, selectedSong, editMode, view } = this.state;
    if (loading) return <Loading />;
    return (
      <>
        <ButtonGroup justified>
          <Button
            appearance={view === "all" ? "ghost" : "default"}
            onClick={() => this.changeView("all")}
          >
            All
          </Button>
          <Button
            appearance={view === "schedule" ? "ghost" : "default"}
            onClick={() => this.changeView("schedule")}
          >
            Schedule
          </Button>
        </ButtonGroup>
        <Table height={550} data={filteredSongs} onRowClick={this.onSongClick}>
          <Column>
            <HeaderCell>S. No</HeaderCell>
            <Cell dataKey="sno" />
          </Column>
          <Column width={250}>
            <HeaderCell>Title</HeaderCell>
            <Cell dataKey="title" />
          </Column>
        </Table>
        {selectedSong && (
          <Modal
            full
            size="lg"
            show={this.state.showModal}
            onHide={this.onModalHide}
          >
            <Modal.Header>
              <Modal.Title>{selectedSong.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {!editMode && <ViewSong selectedSong={selectedSong} />}
              {editMode && <AddSong song={selectedSong} />}
            </Modal.Body>
            {!this.props.viewOnly && (
              <Modal.Footer>
                <Button onClick={this.changeMode}>Edit</Button>
              </Modal.Footer>
            )}
          </Modal>
        )}
      </>
    );
  }
}

export default ListSong;
