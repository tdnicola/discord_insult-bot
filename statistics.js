const unirest = require("unirest");
const { connectionString } = require('./config.json');
const { Client } = require('pg');

const client = new Client({
    connectionString,
    ssl: true,
});

client.connect()

// client.query('SELECT * FROM statistics', (err, result) => {
//     console.log(result, err);
//     client.end();
//   })

const stats = {
    statsGet: function() {

            client.query('SELECT * FROM statistics', (err, result) => {
              console.log(result, err);
              client.end();
            })

        },
    insultPost: function() {

        client.query('UPDATE insult FROM statistics', (err, result) => {
            console.log(result, err);
            client.end();
          })
    },
    praisePost: function() {

        client.query('UPDATE praise FROM statistics', (err, result) => {
            console.log(result, err);
            client.end();
          })
    },
    gifPost: function() {

        client.query('UPDATE * FROM statistics', (err, result) => {
            console.log(result, err);
            client.end();
          })
    },
    cowPost: function() {

        client.query('UPDATE cow FROM statistics', (err, result) => {
            console.log(result, err);
            client.end();
          })
    },
    tyPost: function() {
        client.query('UPDATE ty FROM statistics', (err, result) => {
            console.log(result, err);
            client.end();
          })
    },
    answerPost: function() {
        client.query('UPDATE answer FROM statistics', (err, result) => {
            console.log(result, err);
            client.end();
          })
    },
    movedPosts: function() {
        client.query('UPDATE move FROM statistics', (err, result) => {
            console.log(result, err);
            client.end();
          })
    },
    
}

module.exports.stats = stats