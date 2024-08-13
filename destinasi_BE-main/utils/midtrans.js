const midtransClient = require("midtrans-client");

// Create Core API instance
let coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: "SB-Mid-server-3KlL_4PlRQsaJqtRUg-3Qmcq",
  clientKey: "SB-Mid-client-4ZUq7COOYDwZQzqt",
});

// Create Snap API instance
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-3KlL_4PlRQsaJqtRUg-3Qmcq",
  clientKey: "SB-Mid-client-4ZUq7COOYDwZQzqt",
});

module.exports = { coreApi, snap };
