import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Col, Table} from 'react-materialize';
import moment from 'moment';
const axios = require('axios')

class Conditions extends Component {
    constructor () {
        super ()
        this.state = {
            update: '',
            departure_terminal: 'Tsawwassen',
            arrival_terminal: 'Swartz Bay',
            current_sailing: {
               scheduled_departure: '',
               actual_departure: '',
               percent_full: '',
               car_wait: 0,
               oversize_wait: 0,
               vessel: '',
               eta: ''
            },
            next_sailing: {
                schedule_departure: '',
                percent_full: '',
                car_wait: 0,
                oversize_wait: 0,
                vessel: '',
           },
           next_next_sailing: {
                schedule_departure: '',
                percent_full: '',
                car_wait: 0,
                oversize_wait: 0,
                vessel: '',
           }
        }
    }

    getCurrentSailingData = () => {
        let arrivalHyphenated = this.state.arrival_terminal.replace(" ", "-");
        let departureHyphenated = this.state.departure_terminal.replace(" ", '-');
        let url = `http://localhost:8080/conditions/${arrivalHyphenated}/${departureHyphenated}`

        axios.get(url)
            .then(response => {
                let data = response.data;
                this.setState({
                    current_sailing: {
                        scheduled_departure: data.sailing_time,
                        actual_departure: data.actual_departure,
                        vessel: data.vessel,
                        eta: data.eta
                    }
            });
        });
    }

    setDate = () => {
        let date = new Date();
        let todaysDate = moment(date).format('YYYY-MM-DD HH:mm');
        this.setState({
            update: todaysDate
        })

    }

    componentWillMount() {
        this.setDate();
        this.getCurrentSailingData();
    };

    render() {
        return(
            <div>
                <Col s={8} offset='s2'>
                    <h3>{this.state.departure_terminal} to {this.state.arrival_terminal}</h3>
                    <Link to='/' className="waves-effect waves-light btn terminalButton">Back To Routes</Link>
                    <div className='card'>
                        <h5>Current Sailing</h5>
                        <p>Last Update: {this.state.update}</p>
                        <hr/>
                        <table className='striped'>
                            <tbody>
                                <tr>
                                    <th>Scheduled Departure:</th>
                                    <td>{this.state.current_sailing.scheduled_departure}</td>
                                </tr>
                                <tr>
                                    <th>Actual Departure:</th>
                                    <td>{this.state.current_sailing.actual_departure}</td>
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
                                    <td>{this.state.current_sailing.vessel}</td>
                                </tr>
                                <tr>
                                    <th>ETA:</th>
                                    <td>{this.state.current_sailing.eta}</td>  
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