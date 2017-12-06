const cheerio = require('cheerio');
const request = require('request');
//Database requirements
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

// Bookshelf model for current conditions.
const CurrentCondition = bookshelf
    .Model
    .extend({
        // tell it the name of the table
        tableName: 'current_conditions'
    });

ferryData = (tableNum) => {
    let url = "http://orca.bcferries.com:8080/cc/marqui/at-a-glance.asp";

    request(url, function (error, response, body) {
        if (!error) {

            let $ = cheerio.load(body);
            let ferryRoute = [];
            let departure = '';
            let arrival = '';
            let sailing = '';
            let percentFull = '';
            let carWaits = '';
            let oversizeWaits = '';
            let nextSailing = '';
            let nextPercentFull = '';

            $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child(' + tableNum + ') > tbody > tr:nth-child(2) > td:nth-child(1)').each(function () {
                ferryRoute = ($(this).text()).split(' to ');
                departure = ferryRoute[0];
                arrival = ferryRoute[1];
            });

            $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child('+ tableNum +') > tbody > tr:nth-child(2) > td:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a').each(function () {
                sailing = ($(this).text())
            });

            $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child('+ tableNum +') > tbody > tr:nth-child(2) > td:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(2)').each(function () {
                percentFull = ($(this).text())
            });

            $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child('+ tableNum +') > tbody > tr:nth-child(2) > td:nth-child(3) > div').each(function () {
                carWaits = ($(this).text())
            });

            $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child('+ tableNum +') > tbody > tr:nth-child(2) > td:nth-child(4) > div').each(function () {
                oversizeWaits = ($(this).text())
            });

            $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child('+ tableNum +') > tbody > tr:nth-child(2) > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > a').each(function () {
                nextSailing = ($(this).text())
            });

            $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child('+ tableNum +') > tbody > tr:nth-child(2) > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td:nth-child(2)').each(function () {
                nextPercentFull = ($(this).text())
            });

            const cond_1 = new CurrentCondition({
                departure_terminal: departure,
                arrival_terminal: arrival,
                sailing_time: sailing,
                percent_full: percentFull,
                car_waits: carWaits,
                oversize_waits: oversizeWaits,
                next_sailing_time: nextSailing,
                next_percent_full: nextPercentFull
            });

            cond_1.save().then(conditions => {
                    console.log(conditions.attributes)
                });
        } else {
            console.log("We've encountered an error: " + error);
        }
    });
}

setInterval(getData => {
    ferryData(8);
    ferryData(13);
    ferryData(23);
    ferryData(28);
}, 300000);

