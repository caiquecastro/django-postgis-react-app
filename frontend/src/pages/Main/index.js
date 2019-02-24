import React, { Component, Fragment } from 'react';
import Body from './components/Body';
import Header from './components/Header';

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Body />
      </Fragment>
    );
  }
}

export default Main