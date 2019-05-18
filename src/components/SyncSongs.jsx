import React, { Component } from "react";
import { Modal, Button } from "rsuite";
import Loading from "./Loading";
import { syncSongs } from "../utils";
import axios from "axios";

class SyncSongs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showModal: false
    };
  }

  componentDidMount() {
    axios
      .get("/sync-songs")
      .then(res => {
        return syncSongs(res.data.songs);
      })
      .then(() => {
        this.setState({
          loading: false,
          showModal: true
        });
      })
      .catch(() => alert("Error while fetching songs!"));
  }
  render() {
    const { loading, showModal } = this.state;
    if (loading) return <Loading message="Syncing songs for you..." />;
    return (
      <Modal show={showModal} backdrop>
        <Modal.Body>Songs successfully synced!!</Modal.Body>
        <Modal.Footer>
          <Button href="/list">OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SyncSongs;
