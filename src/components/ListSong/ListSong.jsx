import React, { Component } from "react";

import { Table } from "rsuite";

import { fetchSongs } from "../../utils";
const { Column, Cell, HeaderCell } = Table;

class ListSong extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      loading: true
    };
  }

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
    const { songs, loading } = this.state;
    if (loading) return <div>Loading...</div>;
    return (
      <Table data={songs}>
        <Column>
          <HeaderCell>S. No</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column>
          <HeaderCell>Title</HeaderCell>
          <Cell dataKey="title" />
        </Column>
      </Table>
    );
  }
}

export default ListSong;
