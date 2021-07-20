exports.up = function(knex) {
    return knex.schema.createTable("index", table => {
        table.uuid("id").primary();
        table.string("entity_type").notNullable();
        table.string("entity_id").notNullable();
        table.string("process_id").notNullable();
        table.string("return_type").notNullable();
        table.timestamp("created_at").notNullable();
        table.timestamp("deleted_at");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("index");
};
