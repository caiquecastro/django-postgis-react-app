import UbsApi from '../api/UbsApi';
import React, { Component, Fragment } from 'react';
import { Button, Alert, FormGroup, Input, Table, Form } from 'reactstrap';

class SearchUbsByCity extends Component {
    state = {
        searchTerm: '',
        results: [],
        totalCount: 0,
        currentPage: 1,
        hasNext: false,
        hasPrevious: false,
        errorMessage: null,
    };

    changeTerm = (event) => {
        this.setState({
            results: [],
            totalCount: 0,
            currentPage: 1,
            searchTerm: event.target.value,
        });
    };

    movePage = (page) => {
        this.setState({
            currentPage: page,
        }, () => {
            this.searchResults();
        });
    }

    searchResults = (e) => {
        e && e.preventDefault();

        UbsApi.get('/', {
            params: {
                page: this.state.currentPage,
                search: this.state.searchTerm || undefined,
            },
        }).then(({ data }) => {
            this.setState({
                results: data.results,
                totalCount: data.count,
                hasNext: data.next,
                errorMessage: null,
                hasPrevious: data.previous,
            });
        }).catch(() => {
            this.setState({ errorMessage: 'Não foi possível obter a lista de resultados' })
        });
    }

    renderTable() {
        if (!this.state.results.length) {
            return (
                <p>Não foram encontrados resultados.</p>
            )
        }

        return (
            <div>
                <p>Página {this.state.currentPage }. Encontrados {this.state.totalCount} items</p>
                <Table striped>
                    <thead>
                        <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>CEP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.results.map(item =>
                            <tr key={item.cod_cnes}>
                                <th scope="row">{item.cod_cnes}</th>
                                <td>{item.nom_estab}</td>
                                <td>{item.dsc_endereco}</td>
                                <td>{item.co_cep}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                {this.state.hasPrevious && <Button onClick={() => this.movePage(this.state.currentPage - 1)}>Prev</Button>}
                {this.state.hasNext && <Button onClick={() => this.movePage(this.state.currentPage + 1)}>Next</Button>}
            </div>
        );
    }

    render() {
        return (
            <Fragment>
                <p>Certifique-se de separar maiúscula e minúscula</p>
                <Form className="mb-2" inline onSubmit={this.searchResults}>
                    <FormGroup className="mr-2">
                        <Input type="text" value={this.state.searchTerm} onChange={this.changeTerm} />
                    </FormGroup>
                    <Button color="secondary">Buscar</Button>
                </Form>
                {this.state.errorMessage && <Alert color="danger">{this.state.errorMessage}</Alert>}
                {this.renderTable()}
            </Fragment>
        );
    }
}

export default SearchUbsByCity;