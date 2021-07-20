const { v1:uuid } = require("uuid");
// const { getEngine } = require('./src/engine');
//
// exports.testMessage = function (ctx, next) {
//     console.log("Indexer plugin testMessage works!");
//
//     ctx.status = 200
//     ctx.body = 'test works';
//
//     return ctx, next;
// }
//

const {Index} = require("./src/class/IndexClass");
const { Workflow }  = require("@fieldlink/workflow-engine/src/core/workflow/workflow");
// const { knex } = require("knex")


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


// const db = knex({
//     client: 'pg',
//     connection: {
//         host: "localhost",
//         user: "postgres",
//         password: "postgres",
//         database: "workflow",
//         port: 5432
//     }
// })


 async function indexSave (ctx, next, engine) {
    console.log("Indexer plugin indexSave works!");


     const {uuidv1, entityType, entityId, processId, returnType} = ctx.request.body;


     // engine.saveIndex = async (uuidv1, entityType, entityId, processId, returnType) => {
     //
     //     let indexObj = {
     //         uuidv1: uuidv1,
     //         entityType: entityType,
     //         entityId: entityId,
     //         processId: processId,
     //         returnType: returnType
     //     }
     //
     //    return await knex.insert(indexObj).into('index');
     //
     //     // return await this._db('index').insert(indexObj);
     //
     //     // return await new Index(uuidv1, entityType, entityId, processId, returnType).save();
     //
     //     // return await new Index(uuidv1, entityType, entityId, processId, returnType).save();
     // };

    try {
        // const index = new Index(uuidv1, entityType, entityId, processId, returnType);

        await knex.insert({
            id: uuid(),
            entity_type: entityType,
            entity_id: entityId,
            process_id: processId,
            return_type: returnType,
            created_at: new Date()
        }).into('index');


        // knex.select().table('workflow')


        // const index  = await engine.saveIndex(uuidv1, entityType, entityId, processId, returnType);

        ctx.status = 201;
        ctx.body = 'works';

    } catch (err) {
        ctx.status = 400;
        ctx.body = {message: `Failed at ${err.message}`, error: err};
    }
}

async function wfsave (ctx, next, engine) {
    console.log("Indexer plugin wfsave works!");

    // const engine = getEngine();
    const {name, description, blueprint_spec} = ctx.request.body;
    try {
        const workflow = await engine.saveWorkflow(name, description, blueprint_spec);

        ctx.status = 201;
        ctx.body = {
            workflow_id: workflow.id,
            workflow_url: `${ctx.header.host}${ctx.url}/${workflow.id}`
        };
    } catch (err) {
        ctx.status = 400;
        ctx.body = {message: `Failed at ${err.message}`, error: err};
    }
}

module.exports = {
    test: function() {
        console.log('var is', this.myvar);
        console.log('var is', this.myvar);
    },
    indexSave,
    wfsave
};