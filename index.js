const { v1:uuid } = require("uuid");
const { getEngine } = require('./src/engine');

exports.testMessage = function (ctx, next) {
    console.log("Indexer plugin testMessage works!");

    ctx.status = 200
    ctx.body = 'test works';

    return ctx, next;
}

exports.indexSave = async function (ctx, next) {
    console.log("Indexer plugin indexSave works!");

    const engine = getEngine();
    const { name, description, blueprint_spec } = ctx.request.body;
    try {
        const workflow = await engine.saveWorkflow(name, description, blueprint_spec);
        ctx.status = 201;
        ctx.body = {
            workflow_id: workflow.id,
            workflow_url: `${ctx.header.host}${ctx.url}/${workflow.id}`
        };
    } catch (err) {
        ctx.status = 400;
        ctx.body = { message: `Failed at ${err.message}`, error: err };
    }

    return ctx, next;
}