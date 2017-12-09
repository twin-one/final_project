const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);
const moment = require('moment')

// create a bookshelf model for authors
const Sailing = bookshelf.Model.extend({
    // tell it the name of the table
    tableName: 'sailings',
    // specify relationships
    current_condiditons: function() {
        return this.hasMany(CurrentCondition);
    }
});

// create a bookshelf model for authors
const CurrentCondition = bookshelf.Model.extend({
     // tell it the name of the table
     tableName: 'current_conditions',
     // specify relationships
    //  cars: function() {
    //      return this.hasMany(Car);
    //  }
 });

app.use(bodyParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/conditions/:departure/:arrival', (req, res) => {
    let departure = req.params.departure.replace(/-/g, " ");
    let arrival = req.params.arrival.replace(/-/g, " "); 
    let date = new Date();
    let todaysDate = moment(date).format('YYYY-MM-DD');
    let currentTime = moment(date).format('HH:mm');

    Sailing.where({
            departure_terminal: departure,
            arrival_terminal: arrival,
            sailing_date: todaysDate,
        })
        .where('sailing_time','<', currentTime)
        .orderBy('sailing_time', 'DESC')
        .fetch()
        .then(ferrys => {
            Sailing.where({
                departure_terminal: departure,
                arrival_terminal: arrival,
                sailing_date: todaysDate,
            })
            .where('sailing_time','>', currentTime)
            .orderBy('sailing_time', 'ASC')
            .fetchAll()
            .then(ferrys2 => {
                CurrentCondition.where({
                    departure_terminal: departure,
                    arrival_terminal: arrival,
                    sailing_time: ferrys.attributes.sailing_time
                })
                .orderBy('created_at', 'DESC')
                .fetch()
                .then(ferrys3 => {
                    CurrentCondition.where({
                        departure_terminal: departure,
                        arrival_terminal: arrival,
                        sailing_time: ferrys2.models[0].attributes.sailing_time
                    })
                    .orderBy('created_at', 'DESC')
                    .fetch()
                    .then(ferrys4 => {
                        CurrentCondition.where({
                            departure_terminal: departure,
                            arrival_terminal: arrival,
                            sailing_time: ferrys2.models[1].attributes.sailing_time
                        })
                        .orderBy('created_at', 'DESC')
                        .fetch()
                        .then(ferrys5 => {
                            console.log(ferrys3.attributes)
                            console.log(ferrys4.attributes)
                            res.send({  
                                current: ferrys.attributes,
                                next: ferrys2.models[0],
                                next_next: ferrys2.models[1],
                                current_cond: ferrys3.attributes,
                                next_cond: ferrys4.attributes,
                            })
                        })    
                    })
                })
            })
        })        
});

//Server listen function
app.listen(8080, ()=>{
    console.log('listening on port 8080')
})
