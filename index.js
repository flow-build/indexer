const {v1: uuid} = require("uuid");

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: "localhost",
        user: "postgres",
        password: "postgres",
        database: "workflow",
        port: 5432
    }
});

async function saveIndex(ctx, next) {
    try {

        const {entity_type, entity_id, process_id, return_type} = ctx.request.body;

         knex.insert({
            id: uuid(),
            entity_type: entity_type,
            entity_id: entity_id,
            process_id: process_id,
            return_type: return_type,
            created_at: new Date()
        }).into('index');

        ctx.status = 201;
        ctx.body =  'works';

    } catch (err) {
        ctx.status = 400;
        ctx.body = {message: `Failed at ${err.message}`, error: err};
    }
}

async function fetchIndex(ctx, next) {
    try {
        const { id } = ctx.request.body;

        const fetch =  await knex.select().table('index').where({ id: id, deleted_at: null });

        ctx.status = 200;
        ctx.body = fetch;

    } catch (err) {
        ctx.status = 400;
        ctx.body = {message: `Failed at ${err.message}`, error: err};
    }
}

async function deleteIndex(ctx, next) {
    try {
        const { id } = ctx.request.body;

        await knex.table('index')
            .where({ id: id })
            .update({ deleted_at: new Date() })

        ctx.status = 200;
        ctx.body = 'Deleted Index id ' + id;

    } catch (err) {
        ctx.status = 400;
        ctx.body = {message: `Failed at ${err.message}`, error: err};
    }
}

async function updateIndex(ctx, next) {
    try {
        const { id, entity_type, entity_id, process_id, return_type } = ctx.request.body;

        await knex.table('index')
            .where({ id: id })
            .update({
                entity_type, entity_id, process_id, return_type
            });

        ctx.status = 200;
        ctx.body = 'Updated Index id ' + id;

    } catch (err) {
        ctx.status = 400;
        ctx.body = {message: `Failed at ${err.message}`, error: err};
    }
}

module.exports = {
    saveIndex,
    fetchIndex,
    deleteIndex,
    updateIndex
};