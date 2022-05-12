const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Onion123ring",
    host: "localhost",
    port: 5432,
    database: "food"
});

module.exports = pool;