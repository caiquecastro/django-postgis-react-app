import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Button, Label, FormGroup, Input, Table, Form } from 'reactstrap';

class SearchUbsByCoordinates extends Component {
    state = {
        currentPosition: {
            latitude: 0,
            longitude: 0,
        },
        latitude: 0,
        longitude: 0,
        results: [],
        totalCount: 0,
        currentPage: 1,
        hasNext: false,
        hasPrevious: false,
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            this.setState({
                currentPosition: {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                },
            });
        });
    }

    movePage = (page) => {
        this.setState({
            currentPage: page,
        }, () => {
            this.searchResults();
        });
    }

    changeLongitude = (event) => {
        this.setState({
            longitude: event.target.value,
        });
    }

    changeLatitude = (event) => {
        this.setState({
            latitude: event.target.value,
        });
    }

    useCurrentPosition = () => {
        this.setState((state) => ({
            latitude: state.currentPosition.latitude,
            longitude: state.currentPosition.longitude,
        }));
    }

    searchResults = () => {
        const url = `http://localhost:8000/ubs?format=json&page=${this.state.currentPage}&lat=${this.state.currentPosition.latitude}&lon=${this.state.currentPosition.longitude}`;

        axios.get(url)
            .then(({ data }) => {
                this.setState({
                    results: data.results,
                    totalCount: data.count,
                    hasNext: data.next,
                    hasPrevious: data.previous,
                });
            }).catch(error => {
                // this.setState({ searchCity: { ...this.state.searchCity, ubss: [], maxPage: 1 } })
            })
    }

    render() {
        return (
            <Fragment>
                <p>Insira os valores de latitude e longitude no formato XX,YY</p>

                <Button className="mb-3" onClick={this.useCurrentPosition}>Usar minhas coordenadas</Button>

                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="" className="mr-sm-2">Longitude</Label>
                        <Input
                            type="number"
                            placeholder="Longitude"
                            value={this.state.longitude}
                            onChange={this.changeLongitude}
                        />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="" className="mr-sm-2">Latitude</Label>
                        <Input
                            type="number"
                            placeholder="Latitude"
                            value={this.state.latitude}
                            onChange={this.changeLatitude}
                        />
                    </FormGroup>
                    <Button color="secondary" onClick={this.searchResults}>Buscar</Button>
                </Form>
                <p>Exibindo {this.state.totalCount} items</p>
                {this.state.results.length > 0
                    && <Table striped>
                    <thead>
                        <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>CEP</th>
                        <th>Cidade</th>
                        <th>Distância</th>
                        <th>Rota</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.results.map(item =>
                        <tr key={item.cod_cnes}>
                            <th scope="row">{item.cod_cnes}</th>
                            <td>{item.nom_estab}</td>
                            <td>{item.dsc_endereco}</td>
                            <td>{item.co_cep}</td>
                            <td>{item.dsc_cidade}</td>
                            <td>{item.distancia} km</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://www.google.com/maps/dir/${this.state.latitude},${this.state.longitude}/${item.latitude},${item.longitude}/`}
                                >
                                    Rota
                                </a>
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </Table>
                }
                {this.state.hasPrevious && <Button onClick={() => this.movePage(this.state.currentPage - 1)}>Prev</Button>}
                {this.state.hasNext && <Button onClick={() => this.movePage(this.state.currentPage + 1)}>Next</Button>}
                {/* <td colSpan={6}>Não foi encontrado resultado</td> */}
            </Fragment>
        );
    }
}

export default SearchUbsByCoordinates;