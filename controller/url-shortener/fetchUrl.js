const { db } = require("../../lib");
const { BASE_URL } = require("../../config");

const fetchUrl = async (req, res) => {
  const { id } = req.params;

  const ifExists = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);

  if (ifExists.rowCount < 1) {
    res.status(404).send({
      err: `Provided id doesn't exist. Maybe you want to create a new shorturl first`,
    });
  }

  return res.redirect(`${BASE_URL}/api/v1/${ifExists.rows[0].id}`);
};

module.exports = fetchUrl;
