const express = require("express");
const { saveLicense, getAllLicenses } = require("../controllers/license.controller");

const router = express.Router();

router.post("/", saveLicense);
router.get("/", getAllLicenses);

module.exports = router;
