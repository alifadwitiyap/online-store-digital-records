const { Pool } = require("pg");
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
			connectionString: process.env.DATABASE_URL
		});
		console.log("Database Connected".yellow.bold);
		return pool;
	}
};
