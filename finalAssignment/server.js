const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

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

 //----------------------- Create new current_condition -----------------------------------------')
//  const cond_1 = new CurrentCondition({
//     departure_terminal: 'Tsawwassen',
//     arrival_terminal: 'Swartz Bay',
//     departure_time: '9:00 am',
//     percent_full: '10% full',
//     car_waits: 0,
//     oversize_waits: 0

// })

// cond_1.save().then (conditions => {
//    console.log(conditions.attributes)
// })

//Server listen function
app.listen(8080, ()=>{
    console.log('listening on port 8080')
})
