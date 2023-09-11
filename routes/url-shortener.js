const router = require("express").Router();

const fetchUrl = require("../controller/url-shortener/fetchUrl");
const shortenUrl = require("../controller/url-shortener/shortenUrl");

router.route("/").post(shortenUrl);
router.route("/:id").get(fetchUrl);

module.exports = router;
