const express = require("express");
const router = express.Router();
const { contactUs } = require("../controllers/ContactUs");

router.post("/contactus", contactUs);

module.exports = router;
