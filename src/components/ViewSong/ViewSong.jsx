import React from "react";
import { Grid, Row, Col } from "rsuite";

function ViewSong(props) {
  const { selectedSong } = props;
  return (
    <Grid fluid>
      <Row>
        <Col md={14} sm={24}>
          <div
            dangerouslySetInnerHTML={{
              __html: selectedSong.lyrics
            }}
          />
        </Col>
        <Col md={8} sm={24}>
          <h3>Chords</h3>
          {selectedSong.chords.map(i => (
            <div key={i}>{i}</div>
          ))}
          <h3>Off Chords</h3>
          {selectedSong.offChords &&
            selectedSong.offChords.map(i => <div key={i}>{i}</div>)}
          <h3>Transpose</h3>
          {selectedSong.transpose}
        </Col>
      </Row>
    </Grid>
  );
}

export default ViewSong;
