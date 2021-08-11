const { logger } = require("../utils/logger");
const Index = require("../class/IndexClass");

const formatErrorResponse = (message, error) => {
  return {
    message: {
      message: `Failed at ${message}`,
      error: error,
    },
  };
};

const createIndex = async (ctx, next) => {
  logger.debug("[Indexer] Called saveIndex");
  const indexObj = ctx.request.body;
  const _idx = new Index(ctx.state.persist);

  try {
    const result = _idx.createIndex(indexObj);
    if (!result.error) {
      ctx.status = 200;
      ctx.body = result;
    } else {
      ctx.status = 400;
      ctx.body = formatErrorResponse("createIndex", result.error);
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = formatErrorResponse(err.message, err);
  }

  return next;
};

const readProcessesByEntity = async (ctx, next) => {
  logger.debug("[Indexer] Called readProcessesByEntity");
  const _idx = new Index(ctx.state.persist);
  const entityId = ctx.params.id;
  const limit = ctx.query.limit;

  try {
    const result = _idx.fetchProcessByEntity(entityId, limit);
    if (!result.error) {
      ctx.status = 200;
      ctx.body = result;
    } else {
      ctx.status = 400;
      ctx.body = formatErrorResponse("fetchProcessByEntity", result.error);
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = formatErrorResponse(err.message, err);
  }

  return next;
};

const readProcessesByEntityType = async (ctx, next) => {
  logger.debug("[Indexer] Called readProcessesByEntityType");
  const _idx = new Index(ctx.state.persist);
  const type = ctx.params.type;

  try {
    const result = _idx.fetchProcessesByEntityType(type);
    if (!result.error) {
      ctx.status = 200;
      ctx.body = result;
    } else {
      ctx.status = 400;
      ctx.body = formatErrorResponse(
        "fetchProcessesByEntityType",
        result.error
      );
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = formatErrorResponse(err.message, err);
  }

  return next;
};

const readEntitiesByProcess = async (ctx, next) => {
  logger.debug("[Indexer] Called readEntitiesByProcess");
  const _idx = new Index(ctx.state.persist);
  const processId = ctx.params.id;
  const limit = ctx.query.limit;

  try {
    const result = _idx.fetchEntitiesByProcess(processId, limit);
    if (!result.error) {
      ctx.status = 200;
      ctx.body = result;
    } else {
      ctx.status = 400;
      ctx.body = formatErrorResponse("fetchEntitiesByProcess", result.error);
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = formatErrorResponse(err.message, err);
  }

  return next;
};

const deleteIndex = async (ctx, next) => {
  logger.debug("[Indexer] Called deleteIndex");
  const _idx = new Index(ctx.state.persist);
  const indexId = ctx.params.id;

  try {
    const result = _idx.removeIndex(indexId);
    if (!result.error) {
      ctx.status = 200;
      ctx.body = result;
    } else {
      ctx.status = 400;
      ctx.body = formatErrorResponse("removeIndex", result.error);
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = formatErrorResponse(err.message, err);
  }

  return next;
};

const deleteIndexFromProcess = async (ctx, next) => {
  logger.debug("[Indexer] Called deleteIndexFromProcess");
  const _idx = new Index(ctx.state.persist);
  const processId = ctx.params.id;

  try {
    const result = _idx.removeIndexByProcess(processId);
    if (!result.error) {
      ctx.status = 200;
      ctx.body = result;
    } else {
      ctx.status = 400;
      ctx.body = formatErrorResponse("removeIndexByProcess", result.error);
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = formatErrorResponse(err.message, err);
  }

  return next;
};

const deleteIndexFromEntity = async (ctx, next) => {
  logger.debug("[Indexer] Called deleteIndexFromProcess");
  const _idx = new Index(ctx.state.persist);
  const entityId = ctx.params.id;

  try {
    const result = _idx.removeIndexByEntity(entityId);
    if (!result.error) {
      ctx.status = 200;
      ctx.body = result;
    } else {
      ctx.status = 400;
      ctx.body = formatErrorResponse("removeIndexByEntity", result.error);
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = formatErrorResponse(err.message, err);
  }

  return next;
};

module.exports = {
  createIndex,
  readProcessesByEntity,
  readProcessesByEntityType,
  readEntitiesByProcess,
  deleteIndex,
  deleteIndexFromProcess,
  deleteIndexFromEntity,
};
