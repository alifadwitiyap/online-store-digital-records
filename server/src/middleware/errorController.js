/*eslint-disable */
module.exports = (err, req, res, next) => {
	if (process.env.NODE_ENV === "development") {
		console.log("Start error log   ".bgRed);
		console.log(err);
		console.log("End error log   ".bgRed);
	}

	if (err.code == 23505) {
		return res.status(400).json({
			isSuccess: false,
			message: err.detail
		});
	}

	res.status(err.code || 500).json({
		isSuccess: false,
		message: err.message || "Internal server error"
	});
};
