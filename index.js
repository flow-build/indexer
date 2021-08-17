const { Index } = require("./src/class/IndexClass");
const Controller = require("./src/controller/indexController");
const createIndexNode = require("./src/nodes/createIndexNode");
const retrieveProcessNode = require("./src/nodes/retrieveProcessNode");

module.exports = {
  Index,
  Controller,
  createIndexNode,
  retrieveProcessNode,
};
