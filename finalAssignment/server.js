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

    /* This statement finds all sailings with the terminals specified on todays date, that happen before the current time
    it then lists them sailing time, in descending order and returns the first result which is the sailing currently under way.*/
    Sailing.where({
            departure_terminal: departure,
            arrival_terminal: arrival,
            sailing_date: todaysDate,
        })
        .where('sailing_time','<', currentTime)
        .orderBy('sailing_time', 'DESC')
        .fetch()
        .then(currentFerry => {
            if (currentFerry) {
            // Then we find all the ferry sailings that occur today after the current time.
            Sailing.where({
                departure_terminal: departure,
                arrival_terminal: arrival,
                sailing_date: todaysDate,
            })
            .where('sailing_time','>', currentTime)
            .orderBy('sailing_time', 'ASC')
            .fetchAll()
            .then(followingFerries => {
                if (followingFerries) {
                // Now for the ferry sailing currently, we query the current conditions database for last updated. 
                CurrentCondition.where({
                    departure_terminal: departure,
                    arrival_terminal: arrival,
                    sailing_time: currentFerry.attributes.sailing_time
                })
                .orderBy('created_at', 'DESC')
                .fetch()
                .then(currentFerryConditions => {
                    if (currentFerryConditions) { 
                    // Then we query the current conditions database for the last updated conditions on the next ferry, which contains information on the following ferry.
                    CurrentCondition.where({
                        departure_terminal: departure,
                        arrival_terminal: arrival,
                        sailing_time: followingFerries.models[0].attributes.sailing_time
                    })
                    .orderBy('created_at', 'DESC')
                    .fetch()
                    .then(nextFerryConditions => {
                        res.send({  
                            current: currentFerry.attributes,
                            next: followingFerries.models[0],
                            next_next: followingFerries.models[1],
                            current_cond: currentFerryConditions.attributes,
                            next_cond: nextFerryConditions.attributes,
                        })
           
                    })} else {
                        console.log('Error currentFerryConditions')
                    }
                })} else {
                    console.log('Error followingFerries')
                }
            })} else {
                console.log('Error Ferry')
            }
        })        
});

//Server listen function
app.listen(8080, ()=>{
    console.log('listening on port 8080')
})
