import React, { Component, Fragment } from 'react';
import Body from './pages/Main/components/Body';
import Header from './pages/Main/components/Header';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Body />
      </Fragment>
    );
  }
}

export default App;