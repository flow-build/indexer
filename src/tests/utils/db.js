const Knex = require("knex");

const knexConfig = require("../../../knexfile")[process.env.KNEX_ENV || "test"];
const db = Knex(knexConfig);

module.exports = {
  db,
};
