import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabPane,
  Container,
  TabContent,
} from 'reactstrap';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import SearchUbsByCity from '../../../../components/SearchUbsByCity';
import SearchUbsByCoordinates from '../../../../components/SearchUbsByCoordinates';
import classnames from 'classnames';

class Body extends Component {
  state = {
    activeTab: 'searchByCity'
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <Container fluid>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'searchByCity' })}
              onClick={() => { this.toggle('searchByCity'); }}
            >
              Busca por cidades
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'searchByCoordinates' })}
              onClick={() => { this.toggle('searchByCoordinates'); }}
            >
              Busca por coordenadas
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="searchByCity">
            <SearchUbsByCity />
          </TabPane>
          <TabPane tabId="searchByCoordinates">
            <SearchUbsByCoordinates />
          </TabPane>
        </TabContent>
        {/* <Map
          ref={(ref) => this._map = ref}
          google={this.props.google}
          initialCenter={{
            lat: -23.2384429,
            lng: -45.9252880
          }}
          zoom={10}
          onClick={this.onMapClicked}
          style={{width: 500, height: 500, position: 'relative'}}
        >
          {this.state.searchCity.ubss.map(item => (
            <Marker
              title={'The marker`s title will appear as a tooltip.'}
              name={'SOMA'}
              position={{lat: item.vlr_latitude, lng: item.vlr_longitude}} />
          ))}
        </Map> */}
      </Container>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDLe7faycXCbSAPOykyIeqjhfDjGxwZInE")
})(Body)