import React, { Component } from "react";

import { Table, Modal, Button } from "rsuite";

import { fetchSongs } from "../../utils";

import "./ListSong.css";
import ViewSong from "../ViewSong/ViewSong";
import AddSong from "../AddSong/AddSong";
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
      const usongs = songs.map((song, i) => {
        return { ...song, sno: i + 1 };
      });
      this.setState({
        songs: usongs,
        loading: false
      });
    });
  }

  render() {
    const { songs, loading, selectedSong, editMode } = this.state;
    if (loading) return <div>Loading...</div>;
    return (
      <>
        <Table data={songs} onRowClick={this.onSongClick}>
          <Column>
            <HeaderCell>S. No</HeaderCell>
            <Cell dataKey="sno" />
          </Column>
          <Column>
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
            <Modal.Footer>
              <Button onClick={this.changeMode}>Edit</Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  }
}

export default ListSong;
