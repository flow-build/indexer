const { PersistorProvider } = require("../persist/provider");
const { IndexEntity } = require("../entities/index");
const { validateDataWithSchema } = require("../validators/base");
const { logger } = require("../utils/logger");
class Index {
  constructor(db) {
    this._db = db;
    PersistorProvider.getPersistor(db);
  }

  async createIndex(indexObj) {
    logger.debug("[Indexer] createIndex");
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
    logger.debug("[Indexer] fetchProcessesByEntityType");
    return await new IndexEntity().getProcessByEntityType(entityType);
  }

  async fetchProcessByEntity(entityId, limit = 10) {
    logger.debug("[Indexer] fetchProcessByEntity");
    return await new IndexEntity().getByEntity(entityId, limit);
  }

  async fetchEntitiesByProcess(processId, limit = 10) {
    logger.debug("[Indexer] fetchEntitiesByProcess");
    return await new IndexEntity().getByProcess(processId, limit);
  }

  async removeIndex(id) {
    logger.debug("[Indexer] removeIndex");
    return await new IndexEntity().delete(id);
  }

  async removeIndexByProcess(processId) {
    logger.debug("[Indexer] removeIndexByProcess");
    return await new IndexEntity().deleteAllByProcess(processId);
  }

  async removeIndexByEntity(entityId) {
    logger.debug("[Indexer] removeIndexByEntity");
    return await new IndexEntity().deleteAllByEntity(entityId);
  }
}

module.exports = {
  Index,
};
