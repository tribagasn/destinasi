const pool = require("../config/db");
const util = require("util");

const query = util.promisify(pool.query).bind(pool);

const getAllTestimoni = async (req, res) => {
  try {
    const allTestimoni = await query("SELECT * FROM testimoni");
    res.send({ data: allTestimoni });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const createTestimoni = async (req, res) => {
  try {
    const { nama, posisi, gambar_url, deskripsi } = req.body;
    const id = Math.floor(Math.random() * 100000);

    const result = await query(
      "INSERT INTO Testimoni (id, nama, posisi, gambar_url, deskripsi) VALUES (?, ?, ?, ?, ?)",
      [id, nama, posisi, gambar_url, deskripsi]
    );

    res.send(`Testimoni has been created with ID: ${result.insertId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteTestimoni = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await query("DELETE FROM Testimoni WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send("Testimoni not found");
    }
    res.send(`Testimoni with ID ${id} has been deleted`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllTestimoni,
  createTestimoni,
  deleteTestimoni,
};
