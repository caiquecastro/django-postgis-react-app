import axios from "axios";
import React, { Component } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Table } from 'reactstrap';
import { Container, Form, FormHeader, View } from './styles';
import { Button, Col, Row, Input } from 'reactstrap';
// import './lista';



class Body extends Component {
  state = {
    searchCity: {
      city: null,
      currentPage: 1,
      maxPage: 1,
      ubss: [],
    },
    searchCoords: {
      currentPage: 1,
      maxPage: 1,
      ubss: [],
      long: 0,
      lat: 0,
    },
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.setState({
        searchCoords: {
          ...this.state.searchCoords,
          lat: coords.latitude,
          long: coords.longitude,
        }
      })
    })
  }

  onChangeCity = (e) => {
    this.setState({ searchCity: { ...this.state.searchCity, ubss: [], currentPage: 1, maxPage: 1, city: e.target.value } })
  }

  doSearchByCity = () => {
    const url = "http://api-ldc-hackathon.herokuapp.com/api/ubs/city/";
    const objToPost = { city: this.state.searchCity.city, page: this.state.searchCity.currentPage };

    axios.post(url, objToPost , { "Access-Control-Allow-Origin": true })
      .then(({ data }) => {
        const maxPage = data._metadata.page.split(' ')[2]
        this.setState({ searchCity: { ...this.state.searchCity, ubss: data.records, maxPage: parseInt(maxPage) }})
      }
      ).catch(error => {
        this.setState({ searchCity: { ...this.state.searchCity, ubss: [], maxPage: 1 }})
      })
  }

  doSearchByCoords = (e) => {
    e.preventDefault()
    const url = `http://localhost:8000/ubs/?format=json&lat=${this.state.searchCoords.lat}&lon=${this.state.searchCoords.long}`;
    console.log(url);
    axios.get(url)
      .then(({ data }) => {
        this.setState({ searchCoords: { ...this.state.searchCoords, ubss: data }})
      }
      ).catch(error => {
        this.setState({ searchCoords: { ...this.state.searchCoords, ubss: [] }})
      })
  }

  movePage = (page) => {
    this.setState({ searchCity: { ...this.state.searchCity, currentPage: page } }, () => {
      this.doSearchByCity();
    });
  }

  // new statesCitiesBR({
  //   states: {
  //     elementID: "lista_estados",
  //     defaultOption: "Selecione um Estado"
  //   },
  //   cities: {
  //     elementID: "lista_cidades",
  //     state: "auto",
  //     defaultOption: "Selecione uma Cidade"
  //   }
  // });

  render() {
    return (
      <Container>
        <Tabs>
          <TabList>
            <Tab>Busca por cidades</Tab>
            <Tab>Busca por coordenadas</Tab>
          </TabList>

          <TabPanel>
            <Form>
<<<<<<< HEAD
              <Row form>
              <Col md = {8}>
              <Input type="text" value={this.state.search.city} onChange={this.onChangeCity} />
              {/* <select id="lista_estados"></select>
              <select id="lista_cidades"></select> */}
              </Col>
              <Col md = {4}>
              <Button size="lg" color="secondary" onClick={this.doSearchByCity} > Buscar </Button>
              </Col>
              </Row>
              <Table striped>
=======
              <InputText type="text" value={this.state.searchCity.city} onChange={this.onChangeCity} />
              <Button onClick={this.doSearchByCity} type="button">Buscar</Button>
              {this.state.searchCity.ubss.length > 0
              ?<Table striped>
>>>>>>> cae631b69c63a32979c6a128d3007d9ea9893c49
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Endereço</th>
                    <th>CEP</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.searchCity.ubss.map(item =>
                  <tr key={item.cod_cnes}>
                    <th scope="row">{item.cod_cnes}</th>
                    <td>{item.nom_estab}</td>
                    <td>{item.dsc_endereco}</td>
                    <td>{item.co_cep}</td>
                  </tr>
                  )}
                </tbody>
              </Table>
<<<<<<< HEAD
              <div>
              {this.state.search.currentPage > 1 && <Button size="lg" onClick={() => this.movePage(this.state.search.currentPage - 1)}>Prev</Button>};
              {this.state.search.currentPage < this.state.search.maxPage && <Button size="lg" onClick={() => this.movePage(this.state.search.currentPage + 1)}>Next</Button>}
              </div>
=======
              : <h3>Nenhum item para exibir</h3>
              }
              {this.state.searchCity.currentPage > 1 && <Button onClick={() => this.movePage(this.state.searchCity.currentPage - 1)}>Prev</Button>}
              {this.state.searchCity.currentPage < this.state.searchCity.maxPage && <Button onClick={() => this.movePage(this.state.searchCity.currentPage + 1)}>Next</Button>}
>>>>>>> cae631b69c63a32979c6a128d3007d9ea9893c49
            </Form>
          </TabPanel>
          <TabPanel>
            <Form>
<<<<<<< HEAD
              <Input type="number" placeholder="Longitude" value={this.state.long} onChange={e => this.setState({ long: e.target.value })} />
              <Input type="number" placeholder="Latitude" value={this.state.lat} onChange={e => this.setState({ lat: e.target.value })} />
              <Button onClick={this.doSearchByCoords}>Buscar</Button>
=======
              <InputText
                type="number"
                placeholder="Longitude"
                value={this.state.searchCoords.long}
                onChange={e => this.setState({ searchCoords: { ubss: [], long: e.target.value } })}
              />
              <InputText
                type="number"
                placeholder="Latitude"
                value={this.state.searchCoords.lat}
                onChange={e => this.setState({ searchCoords: {  ubss: [], lat: e.target.value } })}
              />
              <Button onClick={this.doSearchByCoords} type="button">Buscar</Button>
              <Table striped>
                <thead>
                  <tr>
                    <th>Cod</th>
                    <th>Name</th>
                    <th>Endereço</th>
                    <th>Cep</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.searchCoords.ubss.map(item =>
                  <tr key={item.cod_cnes}>
                    <th scope="row">{item.cod_cnes}</th>
                    <td>{item.nom_estab}</td>
                    <td>{item.dsc_endereco}</td>
                    <td>{item.co_cep}</td>
                  </tr>
                  )}
                </tbody>
              </Table>
>>>>>>> cae631b69c63a32979c6a128d3007d9ea9893c49
            </Form>
          </TabPanel>
        </Tabs>


      </Container>

      //Tela 1 (pesquisa por cidade)
    );
  }
}

export default Body