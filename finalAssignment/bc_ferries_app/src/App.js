import React, { Component } from 'react';
import './App.css';
import {Navbar, NavItem, Row, Col, Button} from 'react-materialize'


class App extends Component {
  render() {
    return (
      <div>
        <Row>
          <Navbar brand='BC Ferries App' right>
          </Navbar>
          <Col s={8} offset='s2'>
            <h3>Current Conditions For Popular Routes</h3>
            <Button className='terminalButton'>Tsawwassen to Swartz Bay</Button>
            <Button className='terminalButton'>Swartz Bay to Tsawwassen</Button>
            <Button className='terminalButton'>Horseshoe Bay to Departure Bay</Button>
            <Button className='terminalButton'>Departure Bay to Horseshoe Bay</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
