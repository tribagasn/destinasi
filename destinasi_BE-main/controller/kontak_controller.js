const pool = require("../config/db");
const util = require("util");

const query = util.promisify(pool.query).bind(pool);

const getAllKontak = async (req, res) => {
  try {
    const allKontak = await query("SELECT * FROM Kontak");
    res.send({ data: allKontak });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const createKontak = async (req, res) => {
  try {
    const { nama, email, pesan } = req.body;
    const id = Math.floor(Math.random() * 100000);

    const result = await query(
      "INSERT INTO Kontak (id_no, Nama, Email, Pesan) VALUES (?, ?, ?, ?)",
      [id, nama, email, pesan]
    );

    res.send(`New Kontak has been created with ID: ${result.insertId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteKontak = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await query("DELETE FROM kontak WHERE id_no = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Kontak not found" });
    }

    res.json({ message: `Kontak with ID ${id} has been deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllKontak,
  createKontak,
  deleteKontak,
};
