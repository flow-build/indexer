const { PersistorProvider } = require("../persist/provider");
const { IndexEntity } = require("../entities/index");
const { validateDataWithSchema } = require("../validators/base");
class Index {
  constructor(db) {
    this._db = db;
    PersistorProvider.getPersistor(db);
  }

  async createIndex(indexObj) {
    console.log("createIndex");
    const schema = IndexEntity.getSchema();
    const validation = await validateDataWithSchema(schema, indexObj);
    if (validation.isValid) {
      const response = await new IndexEntity(indexObj).save();
      if (response.error) {
        return {
          errorType: "save",
          errorMessage: response.error,
        };
      } else {
        return response;
      }
    } else {
      return {
        errorType: "validation",
        errorMessage: validation.errors,
      };
    }
  }

  async fetchProcessesByEntityType(entityType) {
    console.log("fetchProcessesByEntityType");
    return await new IndexEntity().getProcessByEntityType(entityType);
  }

  async fetchProcessByEntity(entityId, limit = 10) {
    console.log("fetchProcessByEntity");
    return await new IndexEntity().getByEntity(entityId, limit);
  }

  async fetchEntitiesByProcess(processId, limit = 10) {
    console.log("fetchEntitiesByProcess");
    return await new IndexEntity().getByProcess(processId, limit);
  }

  async removeIndex(id) {
    console.log("removeIndex");
    return await new IndexEntity().delete(id);
  }

  async removeIndexByProcess(processId) {
    console.log("removeIndexByProcess");
    return await new IndexEntity().deleteAllByProcess(processId);
  }

  async removeIndexByEntity(entityId) {
    console.log("removeIndexByEntity");
    return await new IndexEntity().deleteAllByEntity(entityId);
  }
}

module.exports = {
  Index,
};
