const { Pool } = require("pg");

const supabase = `postgresql://postgres:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/postgres`;
const pool = new Pool({ connectionString: supabase });

const getAllEntries =
  ("/",
  async (req, res) => {
    const shortId = req.params.shortId?.toString();
    const exists = await pool.query(`SELECT * FROM urls WHERE id = $1`, [
      shortId,
    ]);
    if (exists.rowCount > 0) {
      return res.redirect(exists.rows[0].og_url);
    }
    return res.status(500).send({ err: `Doesnt exist` });
  });

module.exports = getAllEntries;
