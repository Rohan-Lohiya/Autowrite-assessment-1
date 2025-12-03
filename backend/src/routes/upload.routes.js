const express = require("express");
const upload = require("../middlewares/upload.middleware");
const { uploadLicense } = require("../controllers/upload.controller");

const router = express.Router();

router.post("/", upload.single("file"), uploadLicense);

module.exports = router;
