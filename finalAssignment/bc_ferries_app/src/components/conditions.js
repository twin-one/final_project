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
                    <h3 className='s9'>{this.state.route}</h3>
                    <Link to='/' className="waves-effect waves-light btn terminalButton s3">Back To Routes</Link>
                    <div className='card'>
                        <h5>Current Sailing</h5>
                        <p>Last Update: {this.state.update}</p>
                        <table className='centered'>
                            <tbody>
                               <td className='progressTable'>TSW</td>
                               <td>
                                   <div className='progressBar'>
                                   </div>
                               </td>
                               <td className='progressTable'>SWB</td>
                            </tbody>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <th>Scheduled Departure</th>
                                    <th>Actual Departure</th>
                                    <th>Percent Full</th>
                                    <th>Vessel</th>
                                    <th>ETA</th> 
                                </tr>
                            </thead>    
                            <tbody>    
                                <tr>
                                    <td>9:00 AM</td>
                                    <td>9:04 AM</td>
                                    <td>87%</td>
                                    <td>Queen of Whatever</td>
                                    <td>10:34 AM</td>             
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='card'>
                        <h5>Next Sailing</h5>
                        <p>Last Update: {this.state.update}</p>
                        <table>
                            <tbody>
                               <td>TSW</td>
                               <td>Prgoress Bar</td>
                               <td>SWB</td>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Scheduled Departure</th>
                                    <th>Actual Departure</th>
                                    <th>Percent Full</th>
                                    <th>Vessel</th>
                                    <th>ETA</th> 
                                </tr>
                                <tr>
                                    <td>9:00 AM</td>
                                    <td>9:04 AM</td>
                                    <td>87%</td>
                                    <td>Queen of Whatever</td>
                                    <td>10:34 AM</td>             
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='card'>
                        <h5>Current Sailing</h5>
                        <p>Last Update: {this.state.update}</p>
                        <table>
                            <tbody>
                               <td>TSW</td>
                               <td>Prgoress Bar</td>
                               <td>SWB</td>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Scheduled Departure</th>
                                    <th>Actual Departure</th>
                                    <th>Percent Full</th>
                                    <th>Vessel</th>
                                    <th>ETA</th> 
                                </tr>
                                <tr>
                                    <td>9:00 AM</td>
                                    <td>9:04 AM</td>
                                    <td>87%</td>
                                    <td>Queen of Whatever</td>
                                    <td>10:34 AM</td>             
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Col>
            </div>    
        )
    }
}

export default Conditions;