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
                scheduled_departure: '',
                percent_full: '',
                car_wait: 0,
                oversize_wait: 0,
                vessel: '',
           },
           next_next_sailing: {
                scheduled_departure: '',
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
                console.log("Check out this data", data);
                this.setState({
                    current_sailing: {
                        scheduled_departure: data.current.sailing_time,
                        actual_departure: data.current.actual_departure,
                        percent_full: data.current_cond.percent_full,
                        car_wait: data.current_cond.car_waits,
                        oversize_wait: data.current_cond.oversize_waits,
                        vessel: data.current.vessel,
                        eta: data.current.eta
                    }, 
                    next_sailing: {
                        scheduled_departure: data.next.sailing_time,
                        percent_full: data.next_cond.percent_full,
                        car_wait: data.next_cond.car_waits,
                        oversize_wait: data.next_cond.oversize_waits,
                        vessel: data.next.vessel
                    },
                    next_next_sailing: {
                        scheduled_departure: data.next_next.sailing_time,
                        vessel: data.next_next.vessel
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
                                    <td>{this.state.current_sailing.percent_full}</td>
                                </tr>
                                <tr>
                                    <th>Car Wait:</th>
                                    <td>{this.state.current_sailing.car_wait}</td> 
                                </tr>
                                <tr>
                                    <th>Oversize Wait:</th>
                                    <td>{this.state.current_sailing.oversize_wait}</td> 
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
                                    <td>{this.state.next_sailing.scheduled_departure}</td>
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
                                    <td>{this.state.next_sailing.vessel}</td>
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
                                    <td>{this.state.next_next_sailing.scheduled_departure}</td>
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
                                    <td>{this.state.next_next_sailing.vessel}</td>
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