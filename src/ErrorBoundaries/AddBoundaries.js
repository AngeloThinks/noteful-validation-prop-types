import React, { Component } from "react";

export default class AddBoundaries extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h2>Could not load.</h2>;
    }
    return this.props.children;
  }
}
