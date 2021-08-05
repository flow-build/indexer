/* eslint-disable no-undef */
const { db } = require("./utils/db");
const { Index } = require("../class/IndexClass");
const { v1: uuid } = require("uuid");

afterAll(async () => {
  await db.destroy();
});

describe("IndexClass tests", () => {
  const entityId = uuid();
  const processId = uuid();

  test("createIndex should work", async () => {
    const _index = new Index(db);
    const idxObj = {
      entity_type: "any",
      entity_id: entityId,
      process_id: processId,
      return_type: "any",
    };
    const response = await _index.createIndex(idxObj);
    expect(response).toBeDefined();
    expect(response.id).toBeDefined();
  });

  test("createIndex should not allow duplicated entity & process", async () => {});

  test("fetchProcessesByEntityType should work", async () => {
    const _index = new Index(db);
    const response = await _index.fetchProcessesByEntityType("any");
    expect(response).toBeDefined();
  });

  test("fetchProcessByEntity should work", async () => {
    const _index = new Index(db);
    const response = await _index.fetchProcessByEntity(entityId);
    expect(response).toBeDefined();
    expect(response).toHaveLength(1);
  });

  test("fetchEntitiesByProcess should work", async () => {
    const _index = new Index(db);
    const response = await _index.fetchEntitiesByProcess(processId);
    expect(response).toBeDefined();
    expect(response).toHaveLength(1);
  });

  test("deleteIndex should work", async () => {});

  test("fetchProcessByEntity should not retrieve deleted indexes", async () => {
    const _index = new Index(db);
    const response = await _index.fetchProcessByEntity(entityId);
    expect(response).toBeDefined();
    expect(response).toHaveLength(1);
  });

  test("fetchEntitiesByProcess should not retrieve deleted indexes", async () => {
    const _index = new Index(db);
    const response = await _index.fetchProcessByEntity(entityId);
    expect(response).toBeDefined();
    expect(response).toHaveLength(1);
  });
});
