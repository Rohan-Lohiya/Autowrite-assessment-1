const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./src/routes/upload.routes");
const licenseRoutes = require("./src/routes/license.routes");
const errorHandler = require("./src/middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload-license", uploadRoutes);
app.use("/api/license", licenseRoutes);

app.use(errorHandler);

module.exports = app;
