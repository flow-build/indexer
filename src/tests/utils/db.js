const Knex = require("knex");
const samples = require("./samples");

const knexConfig = require("../../../knexfile")[process.env.KNEX_ENV || "test"];
const db = Knex(knexConfig);

const clean = async (_db) => {
  await _db("index").del();
};

const load = async (_db) => {
  await _db("index").insert(samples["index"]);
};

module.exports = {
  db,
  clean,
  load,
};
