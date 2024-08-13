const oprConfigApp = require("../config/config");
const getKontakAPI = async () => {
  const response = await fetch(
    oprConfigApp.API.baseUrl + oprConfigApp.API.getAllKontak
  );
  const data = await response.json();
  return data;
};
module.exports = { getKontakAPI };
