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
        logger.error("[Indexer] createIndex error on save", response.error);
        return {
          errorType: "save",
          errorMessage: response.error,
        };
      } else {
        return response;
      }
    } else {
      logger.error("[Indexer] createIndex error on validation", validation.errors);
      return {
        errorType: "validation",
        errorMessage: validation.errors,
      };
    }
  }

  async fetchProcessesByEntityType(entity_type) {
    logger.debug("[Indexer] fetchProcessesByEntityType");
    return await new IndexEntity().getProcessByEntityType(entity_type);
  }

  async fetchProcessByEntity(entity_id, limit = 10) {
    logger.debug("[Indexer] fetchProcessByEntity");
    return await new IndexEntity().getByEntity(entity_id, limit);
  }

  async fetchEntitiesByProcess(process_id, limit = 10) {
    logger.debug("[Indexer] fetchEntitiesByProcess");
    return await new IndexEntity().getByProcess(process_id, limit);
  }

  async removeIndex(id) {
    logger.debug("[Indexer] removeIndex");
    return await new IndexEntity().delete(id);w
  }

  async removeIndexByProcess(process_id) {
    logger.debug("[Indexer] removeIndexByProcess");
    return await new IndexEntity().deleteAllByProcess(process_id);
  }

  async removeIndexByEntity(entity_id) {
    logger.debug("[Indexer] removeIndexByEntity");
    return await new IndexEntity().deleteAllByEntity(entity_id);
  }
}

module.exports = {
  Index,
};
