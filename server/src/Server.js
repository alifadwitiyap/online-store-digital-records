const usersRouter = require("./router/usersRouter");
const barangRouter = require("./router/barangRouter");
const laporanRouter = require("./router/laporanRouter");

/*eslint-disable */
const colors = require("colors");
/*eslint-enable */
const express = require("express");
const morgan = require("morgan");
const errorController = require("./middleware/errorController");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

//read json
app.use(express.json());

// log req information
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

//router
app.use("/users", usersRouter);
app.use("/barang", barangRouter);
app.use("/laporan", laporanRouter);
app.use(errorController);

//main run server
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
