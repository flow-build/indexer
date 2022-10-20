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
    logger.debug("createIndex");
    const schema = IndexEntity.getSchema();
    const validation = await validateDataWithSchema(schema, indexObj);
    if (validation.isValid) {
      const response = await new IndexEntity(indexObj).save();
      if (response.error) {
        logger.warn("createIndex error on save");
        return {
          errorType: "save",
          errorMessage: response.error,
        };
      } else {
        return response;
      }
    } else {
      logger.warn("createIndex error on validation");
      return {
        errorType: "validation",
        errorMessage: validation.errors,
      };
    }
  }

  async fetchProcessesByEntityType(entity_type) {
    logger.debug("fetchProcessesByEntityType");
    return await new IndexEntity().getProcessByEntityType(entity_type);
  }

  async fetchProcessByEntity(entity_id, limit = 10) {
    logger.debug("fetchProcessByEntity");
    return await new IndexEntity().getByEntity(entity_id, limit);
  }

  async fetchEntitiesByProcess(process_id, limit = 10) {
    logger.debug("fetchEntitiesByProcess");
    const processIdSchema = {
      oneOf: [
        { type: "string", format: "uuid" },
        { type: "array", items: { type: "string", format: "uuid" } },
      ],
    };
    const validation = await validateDataWithSchema(processIdSchema, process_id);
    if (validation.isValid) {
      const Index = new IndexEntity();
      if (typeof process_id === "string") {
        logger.debug(`fetchEntitiesByProcess, single process, ${process_id}`);
        return await Index.getByProcess(process_id, limit);
      } else {
        logger.debug(`fetchEntitiesByProcess, multiple process, ${process_id}`);
        const calls = process_id.map((process) => Index.getByProcess(process, limit));
        const response = await Promise.all(calls);
        return response;
      }
    } else {
      logger.warn("fetchProcessByEntity error on validation");
      return {
        errorType: "validation",
        errorMessage: validation.errors,
      };
    }
  }

  async removeIndex(id) {
    logger.debug("removeIndex");
    return await new IndexEntity().delete(id);
  }

  async removeIndexByProcess(process_id) {
    logger.debug("removeIndexByProcess");
    return await new IndexEntity().deleteAllByProcess(process_id);
  }

  async removeIndexByEntity(entity_id) {
    logger.debug("removeIndexByEntity");
    return await new IndexEntity().deleteAllByEntity(entity_id);
  }
}

module.exports = {
  Index,
};
