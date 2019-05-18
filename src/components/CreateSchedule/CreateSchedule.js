import React, { Component } from "react";
import { Table } from "rsuite";
import { fetchSongs } from "../../utils";
import Loading from "../Loading";

const { Column, Cell, HeaderCell } = Table;

class CreateSchedule extends Component {
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
      const songsWithIndex = songs.map((song, i) => {
        return { ...song, sno: i + 1 };
      });
      this.setState({
        songs: songsWithIndex,
        loading: false,
        selectedSongs: []
      });
    });
  }

  handleChange = id => {
    const { selectedSongs } = this.state;
    const index = selectedSongs.indexOf(id);
    if (index !== -1) {
      selectedSongs.splice(index, 1);
    } else {
      selectedSongs.push(id);
    }
    this.setState({
      selectedSongs
    });
  };

  render() {
    const { songs, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <Table height={500} data={songs}>
          <Column>
            <HeaderCell>S. No</HeaderCell>
            <Cell dataKey="sno" />
          </Column>
          <Column width={400}>
            <HeaderCell>Title</HeaderCell>
            <Cell dataKey="title" />
          </Column>
          <Column>
            <HeaderCell>Choose</HeaderCell>
            <Cell>
              {rowData => {
                return (
                  <input
                    type="checkbox"
                    onClick={() => this.handleChange(rowData.id)}
                  />
                );
              }}
            </Cell>
          </Column>
        </Table>
      </div>
    );
  }
}

export default CreateSchedule;
