import React, { Component } from "react";

import { Table, Modal, Button } from "rsuite";

import { fetchSongs } from "../../utils";

import "./ListSong.css";
import ViewSong from "../ViewSong/ViewSong";
import AddSong from "../AddSong/AddSong";
import Loading from "../Loading";
const { Column, Cell, HeaderCell } = Table;

class ListSong extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      loading: true,
      selectedSong: null,
      showModal: false,
      editMode: false
    };
  }

  onModalHide = () => {
    this.setState({
      showModal: false
    });
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
    fetchSongs((err, songs) => {
      if (err) {
        return alert("Something went wrong while fetching songs");
      }
      const songsWithIndex = songs.map((song, i) => {
        return { ...song, sno: i + 1 };
      });
      this.setState({
        songs: songsWithIndex,
        loading: false
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
    const { songs, loading, selectedSong, editMode } = this.state;
    if (loading) return <Loading />;
    return (
      <>
        <Table height={550} data={songs} onRowClick={this.onSongClick}>
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
