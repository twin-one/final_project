import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Col, Table} from 'react-materialize';
import Moment from 'moment';

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

    setDate = () => {
        let date = new Date();
        let todaysDate = Moment(date).format('YYYY-MM-DD HH:mm');
        console.log(todaysDate);
    }

    render() {
        return(
            <div>
                <Col s={8} offset='s2'>
                    <h3>{this.state.route}</h3>
                    <Link to='/' className="waves-effect waves-light btn terminalButton">Back To Routes</Link>
                    <div className='card'>
                        <h5>Current Sailing</h5>
                        <p>Last Update: {this.state.update}</p>
                        <hr/>
                        <table className='striped'>
                            <tbody>
                                <tr>
                                    <th>Scheduled Departure:</th>
                                    <td>9:00 AM</td>
                                </tr>
                                <tr>
                                    <th>Actual Departure:</th>
                                    <td>9:04 AM</td>
                                </tr>
                                <tr>
                                    <th>Percent Full:</th>
                                    <td>87%</td>
                                </tr>
                                <tr>
                                    <th>Car Wait:</th>
                                    <td>0</td> 
                                </tr>
                                <tr>
                                    <th>Oversize Wait:</th>
                                    <td>0</td> 
                                </tr>
                                <tr>    
                                    <th>Vessel:</th>
                                    <td>Queen of Whatever</td>
                                </tr>
                                <tr>
                                    <th>ETA:</th>
                                    <td>10:34 AM</td>  
                                </tr>
                            </tbody>    
                        </table>
                    </div>
                    <div className='card'>
                        <h5>Next Sailing</h5>
                        <p>Last Update: {this.state.update}</p>
                        <hr/>
                        <table className='striped'>
                            <tbody>
                                <tr>
                                    <th>Scheduled Departure:</th>
                                    <td>9:00 AM</td>
                                </tr>
                                <tr>
                                    <th>Percent Full:</th>
                                    <td>87%</td>
                                </tr>
                                <tr>
                                    <th>Car Wait:</th>
                                    <td>0</td> 
                                </tr>
                                <tr>
                                    <th>Oversize Wait:</th>
                                    <td>0</td> 
                                </tr>
                                <tr>    
                                    <th>Vessel:</th>
                                    <td>Queen of Whatever</td>
                                </tr>
                            </tbody>    
                        </table>
                    </div>
                    <div className='card'>
                        <h5>Next Next Sailing</h5>
                        <p>Last Update: {this.state.update}</p>
                        <hr/>
                        <Table striped>
                            <tbody>
                                <tr>
                                    <th>Scheduled Departure:</th>
                                    <td>9:00 AM</td>
                                </tr>
                                <tr>
                                    <th>Percent Full:</th>
                                    <td>87%</td>
                                </tr>
                                <tr>
                                    <th>Car Wait:</th>
                                    <td>0</td> 
                                </tr>
                                <tr>
                                    <th>Oversize Wait:</th>
                                    <td>0</td> 
                                </tr>
                                <tr>    
                                    <th>Vessel:</th>
                                    <td>Queen of Whatever</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </div>    
        )
    }
}

export default Conditions;