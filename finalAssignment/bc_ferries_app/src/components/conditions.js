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
            departure_terminal: 'Loading',
            arrival_terminal: 'Loading',
            current_sailing: {
               scheduled_departure: 'Error',
               actual_departure: 'Error',
               percent_full: 'Error',
               car_wait: 'Error',
               oversize_wait: 'Error',
               vessel: 'Error',
               eta: 'Error'
            },
            next_sailing: {
                scheduled_departure: 'Error',
                percent_full: 'Error',
                car_wait: 'Error',
                oversize_wait: 'Error',
                vessel: 'Error',
           },
           next_next_sailing: {
                scheduled_departure: 'Error',
                percent_full: 'Error',
                car_wait: 'Error',
                oversize_wait: 'Error',
                vessel: 'Error',
           }
        }
    }

    getCurrentSailingData = () => {
        let arrivalHyphenated = this.state.arrival_terminal.replace(" ", "-");
        let departureHyphenated = this.state.departure_terminal.replace(" ", '-');
        let url = `http://localhost:8080/conditions/${departureHyphenated}/${arrivalHyphenated}`

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
                        eta: data.current.eta,
                        status: data.current.status,
                        updated_at: data.current.updated_at
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
                        percent_full: data.next_cond.next_percent_full,
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

    setRoute = () => {
        this.setState({
            departure_terminal: this.props.match.params.departure,
            arrival_terminal: this.props.match.params.arrival
        })
        console.log(this.props);
    }

    componentWillMount() {
        this.setDate();
        this.setRoute()
    };

    componentDidMount() {
        this.getCurrentSailingData()
    }

    render() {
        return(
            <div>
                <Col s={8} offset='s2'>
                        <h3>{this.state.departure_terminal} to {this.state.arrival_terminal}</h3>
                        <Link to='/' className="waves-effect waves-light btn terminalButton">Back To Routes</Link>
                    <div className='card'>
                        <h5>Current Sailing</h5>
                        <p>Last Refresh: {this.state.update}</p>
                        <p>Last Updated: {this.state.current_sailing.updated_at}</p>
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
                                <tr>
                                    <th>Status:</th>
                                    <td>{this.state.current_sailing.status}</td>  
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
                                    <td>{this.state.next_sailing.percent_full}</td>
                                </tr>
                                <tr>
                                    <th>Car Wait:</th>
                                    <td>{this.state.next_sailing.car_wait}</td> 
                                </tr>
                                <tr>
                                    <th>Oversize Wait:</th>
                                    <td>{this.state.next_sailing.oversize_wait}</td> 
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
                                    <td>{this.state.next_next_sailing.percent_full}</td>
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