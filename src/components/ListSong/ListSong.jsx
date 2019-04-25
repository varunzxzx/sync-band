import React, { Component } from "react";

import { Table, Modal } from "rsuite";

import { fetchSongs } from "../../utils";

import "./ListSong.css";
import ViewSong from "../ViewSong/ViewSong";
const { Column, Cell, HeaderCell } = Table;

class ListSong extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      loading: true,
      selectedSong: null,
      showModal: false
    };
  }

  onModalHide = () => {
    this.setState({
      showModal: false
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
        return { ...song, id: i + 1 };
      });
      this.setState({
        songs: usongs,
        loading: false
      });
    });
  }

  render() {
    const { songs, loading, selectedSong } = this.state;
    if (loading) return <div>Loading...</div>;
    return (
      <>
        <Table data={songs} onRowClick={this.onSongClick}>
          <Column>
            <HeaderCell>S. No</HeaderCell>
            <Cell dataKey="id" />
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
              <ViewSong selectedSong={selectedSong} />
            </Modal.Body>
          </Modal>
        )}
      </>
    );
  }
}

export default ListSong;
