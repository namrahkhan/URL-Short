const db = require("../../lib/db");
const { nanoid } = require("nanoid");
const { checkUrl } = require("../../lib");

const shortenUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(403).send({ err: `url is required in req body` });
  }
  const longUrl = url.trim();
  if (!checkUrl(longUrl)) {
    return res.status(403).send({
      err: `The provided url must follow proper protocol and formatting patterns e.g https://www.google.com`,
    });
  }

  const existsInDb = await db.query(`SELECT * FROM urls WHERE og_url = $1`, [
    longUrl,
  ]);
  if (existsInDb.rowCount > 0) {
    return res
      .status(202)
      .send({ msg: `${longUrl} exists in database`, data: existsInDb.rows[0] });
  }
  const shortId = nanoid(6);
  const addToDb = await db.query(
    `INSERT INTO urls(og_url, id) VALUES($1, $2) RETURNING *`,
    [longUrl, shortId]
  );
  if (addToDb.rowCount < 1) {
    return res
      .status(500)
      .send({ err: `Something went wrong while adding to the database` });
  }
  res
    .status(200)
    .send({ msg: `${longUrl} added to the database`, data: addToDb.rows[0] });
};

module.exports = shortenUrl;
