const { PersistorProvider } = require("../persist/provider");
const { IndexEntity } = require("../entities/index");

class Index {
    constructor(db){
        this._db = db;
        PersistorProvider.getPersistor(db);
    }

    async testIndex() {
        console.log ('testIndex works');
    }

    async createIndex(indexObj) {
        console.log ('createIndex');
        return await new IndexEntity(indexObj).save();
    }

    async fetchProcessesByEntityType(entityType) {
        console.log ('fetchProcessesByEntityType');
        return await new IndexEntity().getProcessByEntityType(entityType);
    }

    async fetchProcessByEntity(entityId, limit = 10) {
        return await new IndexEntity().getByEntity(entityId, limit);
    }

    async fetchEntitiesByProcess(processId, limit = 10) {
        return await new IndexEntity().getByProcess(processId, limit);
    }

    async removeIndex(id) {
        return await new IndexEntity().delete(id);
    }

    async removeIndexByProcess(processId) {
        return await new IndexEntity().deleteAllByProcess(processId);
    }

    async removeInvexByEntity(entityId) {
        return await new IndexEntity().deleteAllByEntity(entityId)
    }
}

module.exports = {
    Index
};