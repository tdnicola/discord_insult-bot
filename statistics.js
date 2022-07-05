const unirest = require("unirest");
const { connectionString } = require("./config.json");
const { Client, Pool } = require("pg");

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

const stats = {
    queryString: "SELECT * FROM statistics",
    update: function (callback = () => {}) {
        pool.connect()
            .then(() => {
                pool.query(this.queryString, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    result.rows.forEach((element) => {
                        return callback(element);
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },
};

const insult = Object.create(stats);
insult.queryString = "UPDATE statistics set insult = insult + 1";
insult.update = function () {
    return stats.update.call(this);
};

const praise = Object.create(stats);
praise.queryString = "UPDATE statistics set praise = praise + 1";
praise.update = function () {
    return stats.update.call(this);
};

const gif = Object.create(stats);
gif.queryString = "UPDATE statistics set gif = gif + 1";
gif.update = function () {
    return stats.update.call(this);
};

const cow = Object.create(stats);
cow.queryString = "UPDATE statistics set cow = cow + 1";
cow.update = function () {
    return stats.update.call(this);
};

const ty = Object.create(stats);
ty.queryString = "UPDATE statistics set ty = ty + 1";
ty.update = function () {
    return stats.update.call(this);
};

const answer = Object.create(stats);
answer.queryString = "UPDATE statistics set answer = answer + 1";
answer.update = function () {
    return stats.update.call(this);
};

const move = Object.create(stats);
move.queryString = "UPDATE statistics set move = move + 1";
move.update = function () {
    return stats.update.call(this);
};

module.exports = {
    stats,
    insult,
    praise,
    gif,
    cow,
    ty,
    answer,
    move,
};
