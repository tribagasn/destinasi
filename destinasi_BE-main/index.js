const express = require("express");
const routeHandler = require("./route/route");
const cors = require("cors");

const app = express();
app.use(cors());

const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routeHandler(app);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
