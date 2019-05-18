import React, { Component } from "react";
import { Loader } from "rsuite";

class Loading extends Component {
  render() {
    const content = this.props.message ? this.props.message : "";
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Loader size="md" content={content} />
      </div>
    );
  }
}

export default Loading;
