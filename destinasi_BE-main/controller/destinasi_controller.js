const pool = require("../config/db");
const util = require("util");

const query = util.promisify(pool.query).bind(pool);

const getAllDestinasi = async (req, res) => {
  try {
    const alldestinasi = await query("SELECT * FROM destinasi");
    res.send({ data: alldestinasi });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const createDestinasi = async (req, res) => {
  try {
    const { tempat_wisata, isi_konten, map_url, Gambar } = req.body;
    const id = Math.floor(Math.random() * 100000);

    const result = await query(
      "INSERT INTO destinasi (id, tempat_wisata, isi_konten, map_url, Gambar) VALUES (?, ?, ?, ?, ?)",
      [id, tempat_wisata, isi_konten, map_url, Gambar]
    );

    res.send(`New Destinasi has been created with ID: ${result.insertId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteDestinasi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await query("DELETE FROM destinasi WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send("Destinasi not found");
    }
    res.json({ message: `Destinasi with ID ${id} has been deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

const getDestinasi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await query("SELECT * FROM destinasi WHERE id = ?", [id]);
    if (result.length === 0) {
      return res.status(404).send("Destinasi not found");
    }
    res.send(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const editDestinasi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let oldData;
    const getOldData = await query("SELECT * FROM destinasi WHERE id = ?", [
      id,
    ]);
    for (let i = 0; i < getOldData.length; i++) {
      oldData = getOldData[i];
    }
    const {
      tempat_wisata = oldData.tempat_wisata,
      isi_konten = oldData.isi_konten,
      map_url = oldData.map_url,
      Gambar = oldData.Gambar,
    } = req.body;
    const result = await query(
      "UPDATE destinasi SET tempat_wisata = ?, isi_konten = ?, map_url = ?, Gambar = ? WHERE id = ?",
      [tempat_wisata, isi_konten, map_url, Gambar, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).send("Destinasi not found");
    }
    res.send(`Destinasi with ID ${id} has been updated`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllDestinasi,
  createDestinasi,
  deleteDestinasi,
  getDestinasi,
  editDestinasi,
};
