import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Col} from 'react-materialize';

class Conditions extends Component {
    constructor () {
        super ()
        this.state = {
            route: 'Tsawwassen to Swartz Bay',
            update: '9:04 AM',
            sailing: '10:00 AM',
            percent_full: '34%',
            next_sailing: '12:00 PM',
            next_percent_full: '12%'
        }
    }

    render() {
        return(
            <div>
                <Col s={8} offset='s2'>
                    <h3>{this.state.route}</h3>
                    <Link to='/' className="waves-effect waves-light btn terminalButton">Back To Routes</Link>
                </Col>
            </div>    
        )
    }
}

export default Conditions;