const express = require("express");
require("dotenv").config();
let port = process.env.port || 5002;
const errorHanler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const app = express();
connectDB();

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHanler);

app.listen(port, () => {
	console.log(`Application is listening on ${port}`);
});
