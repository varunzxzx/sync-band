import React, { Component } from "react";
import { Checkbox, Input, InputGroup, Icon, Alert } from "rsuite";
import axios from "axios";
import { promiseStatus } from "promise-status-async";

function ValidateIPaddress(ipaddress) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }
  alert("You have entered an invalid IP address!");
  return false;
}

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOffline: props.isOffline,
      ip: props.ip,
      loading: false
    };
  }

  handleChange = (value, checked) => {
    this.setState({
      isOffline: checked
    });
  };

  changeIP = ip => {
    this.setState({
      ip
    });
  };

  onSubmit = () => {
    let { ip } = this.state;
    if (!ValidateIPaddress(ip.split(":")[1].substr(2))) {
      return;
    }
    this.setState({
      loading: true
    });
    const networkPromise = axios
      .get(ip)
      .then(res => {
        Alert.success("You're ready to rock offline 🎉🎉", 3000);
        this.setState({
          loading: false
        });
        this.props.changeMode(ip);
      })
      .catch(err => {
        Alert.error("Connection failure 😕");
        this.setState({
          loading: false
        });
      });

    setTimeout(async () => {
      if ((await promiseStatus(networkPromise)) === "pending") {
        Alert.error("Connection failure 😕");
        this.setState({
          loading: false
        });
      }
    }, 1000);
  };

  render() {
    const { isOffline, ip, loading } = this.state;
    return (
      <>
        <Checkbox
          name="isOffline"
          checked={isOffline}
          onChange={this.handleChange}
        >
          {" "}
          Offline Mode
        </Checkbox>
        {isOffline && (
          <InputGroup style={{ width: "300px" }}>
            <Input
              onChange={this.changeIP}
              name="ip"
              value={ip}
              type="text"
              placeholder="Enter IP Address"
            />
            <InputGroup.Button
              appearance="primary"
              onClick={this.onSubmit}
              disabled={!ip}
              loading={loading}
            >
              <Icon icon="search" /> Submit
            </InputGroup.Button>
          </InputGroup>
        )}
      </>
    );
  }
}

export default Settings;
