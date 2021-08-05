const { v1: uuid } = require("uuid");

exports.seed = function (knex) {
  return knex("index")
    .del()
    .then(function () {
      return knex("index").insert([
        {
          id: uuid(),
          entity_type: "test",
          entity_id: "3e46b690-6394-4ec7-8477-8b382243d5a1",
          process_id: "1022fcdf-fc00-4474-9e9a-a184b5b4d70a",
          return_type: "test",
          created_at: new Date(),
        },
      ]);
    });
};
