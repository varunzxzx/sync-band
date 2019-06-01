import React, { Component } from "react";
import { Table, ButtonGroup, Button, Icon } from "rsuite";
import { fetchSongs } from "../../utils";
import Loading from "../Loading";
import { navigate } from "@reach/router";

import { addSchedule } from "../../api";

const { Column, Cell, HeaderCell } = Table;

class CreateSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      loading: true
    };
  }

  onSubmit = () => {
    if (this.state.selectedSongs.length) {
      addSchedule(this.state.selectedSongs)
        .then(res => {
          alert("Schedule saved successfully!");
          navigate("/");
        })
        .catch(err => alert(err));
    } else {
      alert("No song selected");
    }
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
          <Column width={50}>
            <HeaderCell>S. No</HeaderCell>
            <Cell dataKey="sno" />
          </Column>
          <Column width={250}>
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
        <ButtonGroup justified size="lg">
          <Button onClick={this.onSubmit} color="blue">
            <Icon icon="send" /> Submit
          </Button>
          <Button onClick={() => navigate("/")} color="red">
            <Icon icon="close" /> Cancel
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default CreateSchedule;
