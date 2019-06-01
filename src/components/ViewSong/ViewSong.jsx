import React from "react";
import { Grid, Row, Col } from "rsuite";

import "./ViewSong.css";

function ViewSong(props) {
  const { selectedSong } = props;
  return (
    <Grid className="view-song" fluid>
      <Row>
        <Col md={8} sm={24}>
          <h3>Chords</h3>
          {selectedSong.chords.map(i => (
            <div className="chords" key={i}>
              {i}
            </div>
          ))}
          {selectedSong.offChords.length !== 0 && (
            <>
              <h3>Off Chords</h3>
              {selectedSong.offChords.map(i => (
                <div className="chords" key={i}>
                  {i}
                </div>
              ))}
            </>
          )}
          <h3>Transpose</h3>
          <div className="transpose">{selectedSong.transpose}</div>
        </Col>
        <Col md={14} sm={24}>
          <h3>Lyrics</h3>
          <div
            className="lyrics"
            dangerouslySetInnerHTML={{
              __html: selectedSong.lyrics
            }}
          />
        </Col>
      </Row>
    </Grid>
  );
}

export default ViewSong;
