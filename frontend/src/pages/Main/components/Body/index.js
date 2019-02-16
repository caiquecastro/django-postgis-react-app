import axios from "axios";
import React, { Component } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Table } from 'reactstrap';
import { Button, Container, Form, FormHeader, InputText } from './styles';



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

  doSearchByCoords = () => {
    const url = `http://localhost:8000?format=json&lat=${this.state.searchCoords.lat}&long=${this.state.searchCoords.long}`;
    console.log(url);
    axios.get(url)
      .then(({ data }) => {
        this.setState({ searchCoords: { ...this.state.searchCoords, ubss: data.records }})
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
              <InputText type="text" value={this.state.searchCity.city} onChange={this.onChangeCity} />
              <Button onClick={this.doSearchByCity}>Buscar</Button>
              {this.state.searchCity.ubss.length > 0
              ?<Table striped>
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
                  <tr>
                    <th scope="row">{item.cod_cnes}</th>
                    <td>{item.nom_estab}</td>
                    <td>{item.dsc_endereco}</td>
                    <td>{item.co_cep}</td>
                  </tr>
                  )}
                </tbody>
              </Table>
              : <h3>Nenhum item para exibir</h3>
              }
              {this.state.searchCity.currentPage > 1 && <Button onClick={() => this.movePage(this.state.searchCity.currentPage - 1)}>Prev</Button>}
              {this.state.searchCity.currentPage < this.state.searchCity.maxPage && <Button onClick={() => this.movePage(this.state.searchCity.currentPage + 1)}>Next</Button>}
            </Form>
          </TabPanel>
          <TabPanel>
            <Form>
              <InputText type="number" placeholder="Longitude" value={this.state.searchCoords.long} onChange={e => this.setState({ searchCoords: { long: e.target.value } })} />
              <InputText type="number" placeholder="Latitude" value={this.state.searchCoords.lat} onChange={e => this.setState({ searchCoords: { lat: e.target.value } })} />
              <Button onClick={this.doSearchByCoords}>Buscar</Button>
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
                  <tr>
                    <th scope="row">{item.cod_cnes}</th>
                    <td>{item.nom_estab}</td>
                    <td>{item.dsc_endereco}</td>
                    <td>{item.co_cep}</td>
                  </tr>
                  )}
                </tbody>
              </Table>
            </Form>
          </TabPanel>
        </Tabs>


      </Container>

      //Tela 1 (pesquisa por cidade)
    );
  }
}

export default Body