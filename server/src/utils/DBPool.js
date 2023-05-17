const { Pool } = require("pg");
const fs = require('fs');


/*eslint-disable */
const colors = require("colors");
/*eslint-enable */
require("dotenv").config({ path: "../../.env" });

let pool;
module.exports = {
	get: () => {
		if (pool) {
			return pool;
		}
		pool = new Pool({
			user: process.env.DBUSER,
			host: process.env.DBHOST,
			database: process.env.DBNAME,
			password: process.env.DBPW,
			port: process.env.DBPORT,
			ssl: {
				"rejectUnauthorized": false
			}
		});
		console.log("Database Connected".yellow.bold);
		return pool;
	}
};
