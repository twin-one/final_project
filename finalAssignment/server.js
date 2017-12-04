const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

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
 const cond_1 = new CurrentCondition({
    sailing_id: 'Tsawwassen',
    arrival_terminal: 'Swartz Bay',
    sailing_time: '9:00 pm',
    percent_full: '10% full',
    car_waits: 0,
    oversize_waits: 0

})

cond_1.save().then (conditions => {
   console.log(conditions.attributes)
})

//----------------------- Get all cars -----------------------------------------')
CurrentCondition.fetchAll()
   .then(result => {
       const conditions = result.models.map(conditions => {
           return conditions.attributes;
       });
       console.log('\n----------------------- Get all sailings -----------------------------------------\n')     
       console.log(conditions);
   });
