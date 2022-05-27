const redis = require("redis");

let staticClient;

class cacheService {
	constructor() {
		if (!staticClient) {
			staticClient = this.getCache();
		}

		this._client = staticClient;
	}

	getCache() {
		staticClient = redis.createClient({
			socket: {
				host: process.env.REDIS_HOSTNAME,
				port: process.env.REDIS_PORT
			},
			password: process.env.REDIS_PASSWORD
		});
		staticClient.on("error", (error) => {
			console.error(error);
		});
		staticClient.connect();
		return staticClient;
	}

	async set(key, value, expirationInSecond = 3600) {
		await this._client.set(key, value, {
			EX: expirationInSecond
		});
	}

	async get(key) {
		const result = await this._client.get(key);
		return result;
	}

	delete(key) {
		return this._client.del(key);
	}
}

module.exports = cacheService;
