const express = require("express");

const dataRoute = express.Router();

const dataControler = require("../backend/controler");

dataRoute.post("/createpassport", dataControler.createPassport);
dataRoute.post('/getpassport', dataControler.getPassport)

module.exports = dataRoute;