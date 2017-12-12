import React, { Component } from 'react';
import './App.css';
import {Navbar, Row, NavItem} from 'react-materialize';
import {Route} from 'react-router-dom';
import FerryRoutes from './components/ferryRoutes';
import Conditions from './components/conditions';


class App extends Component {
  render() {
    return (
      <div>
        <Row>
          <Navbar brand='BC Ferries App' right>
            <NavItem>About</NavItem>
            <NavItem>Routes</NavItem>
          </Navbar>
          <Route exact path='/' render={() => <FerryRoutes/>}/>
          <Route path='/conditions/:departure/:arrival' render={(props) => <Conditions {...props}/>}/>
        </Row>
      </div>
    );
  }
}

export default App;
