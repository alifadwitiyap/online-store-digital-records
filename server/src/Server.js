/*eslint-disable */
const colors = require("colors");
/*eslint-enable */
const express = require("express");
const morgan = require("morgan");
const UsersRouter = require("./router/UsersRouter");
const barangRouter = require("./router/barangRouter");
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
app.use("/users", UsersRouter);
app.use("/barang", barangRouter);
app.use(errorController);

//main run server
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
