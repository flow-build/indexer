const { Index } = require("./src/class/IndexClass");
const Controller = require("./src/controller/indexController");
const createIndexNode = require("./src/nodes/createIndexNode");
const retrieveProcessnode = require("./src/nodes/retrieveProcessNode");

module.exports = {
  Index,
  Controller,
  createIndexNode,
  retrieveProcessnode,
};
