const dotenv = require("dotenv");
const result = dotenv.config();

let envs;

if ("error" in result || process.env.NODE_ENV == "production") {
    envs = {};
    Object.entries(process.env).map(([key, value]) => (envs[key] = value));
} else {
    envs = result.parsed;
}

module.exports = envs;
