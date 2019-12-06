import React, { Component } from "react";
import axios from "axios";
import { Context } from "./_contexts";

export default class Provider extends Component {
  constructor(props) {
    super(props);
    this.URI = "http://localhost:3001/";
    // this.getProtocols(this);

    this.state = {
      protocols: []
    };
  }

  // getProtocols = (_this) => {
  // 	const dataBase = axios
  // 		.get(this.URI + '/v1/protocols')
  // 		.then((res) => res.data)
  // 		.then((data) => _this.setState({ protocols: data }));
  // 	return dataBase;
  // };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
