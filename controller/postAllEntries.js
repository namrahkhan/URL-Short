const { Pool } = require("pg");


const supabase = `postgresql://postgres:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/postgres`
const pool = new Pool({connectionString: supabase})




const postAllEntries=('/',async (req, res) => {
    const bodyUrl = req.body.url;
    const longUrl = bodyUrl.trim();
  
    if (!longUrl) {
      return res.status(500).send({ err: "No url provided in request body" });
    }
    if (!longUrl.startsWith("http")) {
      return res.status(500).send({
        err: "Specify the protocol of the url i.e. http, https or ftp etc.",
      });
    }
  
    const ifExists = await pool.query("SELECT * FROM urls WHERE og_url = $1", [
      longUrl,
    ]);
  
    if (ifExists.rowCount > 0) {
      return res.status(200).send({
        data: ifExists.rows[0],
        shortUrl: `${BASE_URL}/${ifExists.rows[0].id}`,
      });
    }
    const generatedId = nanoid();
  
    const addToDb = await pool.query(
      "INSERT INTO urls(id, og_url) VALUES($1, $2) RETURNING *",
      [generatedId, longUrl]
    );
  
    if (addToDb.rowCount > 0) {
      return res
        .status(200)
        .send({ data: addToDb.rows[0], shortUrl: `${BASE_URL}/${generatedId}` });
    }
  
    return res.status(500).send({ err: "End of Controller" });
  });
module.exports=postAllEntries