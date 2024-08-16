const express = require("express");
const {
  getAllDestinasi,
  createDestinasi,
  deleteDestinasi,
  getDestinasi,
  editDestinasi,
} = require("../controller/destinasi_controller");
const {
  getAllTestimoni,
  createTestimoni,
  deleteTestimoni,
} = require("../controller/testimoni_controller");
const {
  getAllKontak,
  createKontak,
  deleteKontak,
} = require("../controller/kontak_controller");
const { getTokenMidtrans } = require("../controller/midtrans_controller");
const route = express.Router();

const routeHandler = async (app) => {
  const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  };

  route.get("/", (req, res) => {
    res.send(`App listening on port 3000`);
  });

  route.get("/getAllDestinasi", getAllDestinasi);

  route.get("/getDestinasi/:id", getDestinasi);

  route.post("/createDestinasi", createDestinasi);

  route.post("/deleteDestinasi/:id", deleteDestinasi);

  route.get("/getAllTestimoni", getAllTestimoni);

  route.post("/createTestimoni", createTestimoni);

  route.delete("/deleteTestimoni/:id", deleteTestimoni);

  route.get("/getAllKontak", getAllKontak);

  route.post("/createKontak", createKontak);

  route.post("/deleteKontak/:id", deleteKontak);

  route.post("/getTokenMidtrans", getTokenMidtrans);

  route.post("/editDestinasi/:id", editDestinasi);

  route.use(logger);

  app.use("/", route);
};

module.exports = routeHandler;
