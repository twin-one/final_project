import React, { Component } from 'react';
import './App.css';
import {Navbar, Row, Col, Button} from 'react-materialize';
import {Route} from 'react-router-dom';
import FerryRoutes from './components/ferryRoutes';
import Conditions from './components/conditions';


class App extends Component {
  render() {
    return (
      <div>
        <Row>
          <Navbar brand='BC Ferries App' right>
          </Navbar>
          <Route exact path='/' render={() => <FerryRoutes/>}/>
          <Route path='/conditions' render={() => <Conditions/>}/>
        </Row>
      </div>
    );
  }
}

export default App;
