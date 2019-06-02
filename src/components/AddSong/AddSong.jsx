import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Input,
  FlexboxGrid,
  Tag,
  IconButton,
  Icon,
  ButtonGroup,
  Button
} from "rsuite";
import "./AddSong.css";
import * as uuid from "uuid/v4";

import { addSong, editSong } from "../../utils";
import { navigate } from "@reach/router";

let editMode = false;

class AddSong extends Component {
  constructor(props) {
    super(props);
    let song = {
      chords: [],
      offChords: [],
      transpose: 0,
      title: "",
      lyrics: ""
    };
    if (props.song) {
      song = props.song;
      song.lyrics = song.lyrics.replace(/<br \/>/g, "\r\n");
      editMode = true;
    }
    this.state = { ...song };
  }

  onSubmit = () => {
    const song = { ...this.state };
    song.lyrics = song.lyrics.trim();
    song.title = song.title.trim();
    if (!song.lyrics || !song.title || !song.chords.length) {
      alert("Some fields are missing!!");
      return;
    }
    song.lyrics = song.lyrics.replace(/\r?\n/g, "<br />");
    if (editMode) {
      delete song.sno;
      return editSong(song, function(err, msg) {
        if (err) alert("Something went wrong while updating a song");
        alert(msg);
        window.location.reload();
      });
    }
    song.id = uuid();
    addSong(song, function(err, msg) {
      if (err) alert("Something went wrong while adding a song");
      alert(msg);
      navigate("/");
    });
  };

  onInputChange = (value, { target: { name } }) => {
    this.setState({ [name]: value });
  };

  handleChordsChange = (value, e) => {
    const chords = [...this.state.chords];
    const name = e.target.name;
    chords[name] = value;
    this.setState({ chords }, () => {
      this["chords" + name].focus();
    });
  };

  handleOffChordsChange = (value, e) => {
    const offChords = [...this.state.offChords];
    offChords[e.target.name] = value;
    this.setState({ offChords });
  };

  handleTranspose = e => {
    let { transpose } = this.state;
    if (e === "-") {
      transpose--;
    } else {
      transpose++;
    }
    this.setState({ transpose });
  };

  render() {
    const { chords, offChords, transpose } = this.state;
    return (
      <Grid fluid>
        <Row className="add-song" gutter={50}>
          <Col md={14} sm={24}>
            <div className="item">
              <h3>Title</h3>
              <Input
                name="title"
                placeholder="Enter title"
                style={{ fontSize: "24px" }}
                onChange={this.onInputChange}
                value={this.state.title}
              />
            </div>
            <div className="item">
              <h3>Lyrics</h3>
              <Input
                componentClass="textarea"
                style={{
                  maxHeight: "300px",
                  height: "300px",
                  fontSize: "20px"
                }}
                name="lyrics"
                placeholder="Enter lyrics"
                onChange={this.onInputChange}
                value={this.state.lyrics}
              />
            </div>
          </Col>
          <Col md={8} sm={24}>
            <div className="item">
              <h3>Chords</h3>
              <FlexboxGrid justify="space-around">
                {chords.map((item, i) => {
                  return (
                    <FlexboxGrid.Item key={i}>
                      <Input
                        name={i}
                        inputRef={ref => (this["chords" + i] = ref)}
                        value={item}
                        onChange={this.handleChordsChange}
                        style={{ width: "40px", padding: "7px" }}
                      />
                    </FlexboxGrid.Item>
                  );
                })}
                <FlexboxGrid.Item key={chords.length}>
                  <Input
                    name={chords.length}
                    inputRef={ref => (this["chords" + chords.length] = ref)}
                    onChange={this.handleChordsChange}
                    style={{ width: "40px", padding: "7px" }}
                  />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </div>
            <div className="item">
              <h3>Off Chords</h3>
              <FlexboxGrid justify="space-around">
                {offChords.map((item, i) => {
                  return (
                    <FlexboxGrid.Item key={i}>
                      <Input
                        name={i}
                        value={item}
                        onChange={this.handleOffChordsChange}
                        style={{ width: "40px", padding: "7px" }}
                      />
                    </FlexboxGrid.Item>
                  );
                })}
                <FlexboxGrid.Item key={offChords.length}>
                  <Input
                    name={offChords.length}
                    onChange={this.handleOffChordsChange}
                    style={{ width: "40px", padding: "7px" }}
                  />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </div>
            <div className="item">
              <h3>Transpose</h3>
              <FlexboxGrid justify="space-around">
                <FlexboxGrid.Item>
                  <IconButton
                    size="sm"
                    icon={<Icon icon="minus" />}
                    circle
                    appearance="primary"
                    onClick={() => {
                      this.handleTranspose("-");
                    }}
                  />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <Tag color="blue" style={{ fontSize: "22px" }}>
                    {transpose}
                  </Tag>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <IconButton
                    size="sm"
                    icon={<Icon icon="plus" />}
                    circle
                    appearance="primary"
                    onClick={() => {
                      this.handleTranspose("+");
                    }}
                  />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </div>
            <div className="item">
              <ButtonGroup justified size="lg">
                <Button onClick={this.onSubmit} color="blue">
                  <Icon icon="send" /> Submit
                </Button>
                <Button onClick={() => navigate("/")} color="red">
                  <Icon icon="close" /> Cancel
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default AddSong;
