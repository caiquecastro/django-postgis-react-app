import { Component } from 'react';
import { Container } from './styles';


class Header extends Component {
  render() {
    return (
      <Container>
        <h1 style={{ textAlign: "center" }}> Busca de UBS  </h1>
      </Container>
    );
  }
}

export default Header