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
const CurrentCondition = bookshelf.Model.extend({
    // tell it the name of the table
    tableName: 'current_conditions',
});

//Google search results
let url = "http://orca.bcferries.com:8080/cc/marqui/at-a-glance.asp";

request(url, function (error, response, body) {
    if (!error) {
        let $ = cheerio.load(body);
        let ferryRouteTswToSwb = [];
        let departureTswToSwb = '';
        let arrivalTswToSwb = '';
        let sailingTswToSwb = '';
        let percentFullTswToSwb = '';
        let carWaitsTswToSwb = '';
        let oversizeWaitsTswToSwb = '';
        let nextSailingTswToSwb = '';
        let nextPercentFullTswToSwb = '';

        $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr:nth-child(2) > td:nth-child(1)').each(function () {
            ferryRouteTswToSwb = ($(this).text()).split(' to ');
            departureTswToSwb = ferryRouteTswToSwb[0];
            arrivalTswToSwb = ferryRouteTswToSwb[1];
        });

        $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr:nth-child(2) > td:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a').each(function () {
            sailingTswToSwb = ($(this).text())
        });

        $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr:nth-child(2) > td:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(2)').each(function () {
            percentFullTswToSwb = ($(this).text())
        });

        $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr:nth-child(2) > td:nth-child(3) > div').each(function () {
            carWaitsTswToSwb = ($(this).text())
        });

        $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr:nth-child(2) > td:nth-child(4) > div').each(function () {
            oversizeWaitsTswToSwb = ($(this).text())
        });

        $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr:nth-child(2) > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > a').each(function () {
            nextSailingTswToSwb = ($(this).text())
        });

        $('#tblLayout > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr:nth-child(2) > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td:nth-child(2)').each(function () {
            nextPercentFullTswToSwb = ($(this).text())
        });

        // console.log("\nBC Ferries Data \n -----------------------------");
        // console.log(departureTswToSwb);
        // console.log(arrivalTswToSwb);
        // console.log(sailingTswToSwb);
        // console.log(percentFullTswToSwb);
        // console.log(carWaitsTswToSwb);
        // console.log(oversizeWaitsTswToSwb);
        // console.log(nextSailingTswToSwb);
        // console.log(nextPercentFullTswToSwb);

        const cond_1 = new CurrentCondition({
            departure_terminal: departureTswToSwb,
            arrival_terminal: arrivalTswToSwb,
            departure_time: sailingTswToSwb,
            percent_full: percentFullTswToSwb,
            car_waits: carWaitsTswToSwb,
            oversize_waits: oversizeWaitsTswToSwb
        });

        cond_1.save().then (conditions => {
            console.log(conditions.attributes)
        })

    } else {
        console.log("We've encountered an error: " + error);
    }
});
