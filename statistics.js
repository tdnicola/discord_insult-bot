const unirest = require("unirest");
const { connectionString } = require('./config.json');
const { Client } = require('pg');

const client = new Client({
    connectionString,
    ssl: true,
});

const stats = {
    statsGet: function() {
        client.connect()
        .then(() => {
            client.query('SELECT * FROM statistics', (err, result) => {
                client.end();
                return result + err
            })
        })

        },
    insultPost: function() {
        client.connect()
        .then(() => {
            client.query('UPDATE statistics set insult = insult + 1', (err, result) => {
                console.log(result, err);
                client.end();
              })

        })
    },
    praisePost: function() {
        client.connect()
        .then(() => {
            client.query('UPDATE statistics set praise = praise + 1', (err, result) => {
                client.end();
              })

        })
    },
    gifPost: function() {
        client.connect()
        .then(() => {
            client.query('UPDATE statistics set gif = gif + 1', (err, result) => {
                client.end();
              })
        })
    },
    cowPost: function() {
        client.connect()
        .then(() => {
            client.query('UPDATE statistics set cow = cow + 1', (err, result) => {
                console.log(result, err);
                client.end();
              })
        })

    },
    tyPost: function() {
        client.connect()
            .then(() => {
                client.query('UPDATE statistics set ty = ty + 1', (err, result) => {
                    console.log(result, err);
                    client.end();
                  })
            })
    },
    answerPost: function() {
        client.connect()
        .then(() => {
            client.query('UPDATE statistics set answer = answer + 1', (err, result) => {
                client.end();
              })

        })
    },
    movedPosts: function() {
        client.connect()
        .then((
            client.query('UPDATE statistics set move = move + 1', (err, result) => {
                console.log(result, err);
                client.end();
              })
        ))
    },
    
}

module.exports.stats = stats