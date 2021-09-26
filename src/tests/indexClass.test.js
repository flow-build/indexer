/* eslint-disable no-undef */
const { db, load, clean } = require("./utils/db");
const { Index } = require("../class/IndexClass");
const { v1: uuid } = require("uuid");

beforeAll(async () => {
  await load(db);
});

afterAll(async () => {
  await clean(db);
  await db.destroy();
});

describe("IndexClass tests", () => {
  const entityId = uuid();
  const processId = uuid();
  const sampleIndex = {
    entity_type: "any",
    entity_id: entityId,
    process_id: processId,
  };

  test("createIndex should work", async () => {
    const _index = new Index(db);
    const response = await _index.createIndex(sampleIndex);
    expect(response).toBeDefined();
    expect(response.id).toBeDefined();
  });

  test("createIndex should require processId", async () => {
    const _index = new Index(db);
    const idxObj = {
      entity_type: "any",
      entity_id: entityId,
    };
    const response = await _index.createIndex(idxObj);
    expect(response).toBeDefined();
    expect(response.id).not.toBeDefined();
    expect(response.errorType).toBeDefined();
    expect(response.errorType).toBe("validation");
    expect(response.errorMessage).toBeDefined();
    expect(response.errorMessage).toHaveLength(1);
    expect(response.errorMessage[0].message).toBe("must have required property 'process_id'");
  });

  test("createIndex should require entityId", async () => {
    const _index = new Index(db);
    const idxObj = {
      entity_type: "any",
      process_id: processId,
    };
    const response = await _index.createIndex(idxObj);
    expect(response).toBeDefined();
    expect(response.id).not.toBeDefined();
    expect(response.errorType).toBeDefined();
    expect(response.errorType).toBe("validation");
    expect(response.errorMessage).toBeDefined();
    expect(response.errorMessage).toHaveLength(1);
    expect(response.errorMessage[0].message).toBe("must have required property 'entity_id'");
  });

  test("createIndex should not allow duplicated entity & process", async () => {
    const _index = new Index(db);
    const idxObj = {
      entity_type: "any",
      entity_id: entityId,
      process_id: processId,
    };
    const response = await _index.createIndex(idxObj);
    expect(response).toBeDefined();
    expect(response.id).not.toBeDefined();
    expect(response.errorType).toBeDefined();
    expect(response.errorType).toBe("save");
  });

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

  test("fetchEntitiesByProcess should work for a single process_id", async () => {
    const _index = new Index(db);
    const response = await _index.fetchEntitiesByProcess(processId);
    expect(response).toBeDefined();
    expect(response).toHaveLength(1);
  });

  test("fetchEntitiesByProcess should work for multiple process_ids", async () => {
    const _index = new Index(db);
    const secondProcessId = uuid();
    const secondeSample = {
      entity_type: "other",
      entity_id: uuid(),
      process_id: secondProcessId,
    };
    await _index.createIndex(secondeSample);

    const response = await _index.fetchEntitiesByProcess([processId, secondProcessId]);
    expect(response).toBeDefined();
    expect(response).toHaveLength(2);
  });

  test("fetchEntitiesByProcess should not work if process_id is not a uuid", async () => {
    const _index = new Index(db);
    const id = "not_a_uuid";
    const response = await _index.fetchEntitiesByProcess(id);
    expect(response).toBeDefined();
    expect(response.errorType).toBeDefined();
    expect(response.errorType).toBe("validation");
  });

  test("fetchEntitiesByProcess should work if process_id is a array of strings", async () => {
    const _index = new Index(db);
    const id = ["not_a_uuid", "nor_this"];
    const response = await _index.fetchEntitiesByProcess(id);
    expect(response).toBeDefined();
    expect(response.errorType).toBeDefined();
    expect(response.errorType).toBe("validation");
  });

  test("removeIndex should work", async () => {
    const seededProcessId = "1022fcdf-fc00-4474-9e9a-a184b5b4d70a";
    const seededIndexId = "17d8d0de-a9e3-4e9c-acbb-b6e9c266f0ac";
    const _index = new Index(db);
    const delResponse = await _index.removeIndex(seededIndexId);
    expect(delResponse).toBeDefined();
    const fetchResponse = await _index.fetchEntitiesByProcess(seededProcessId);
    expect(fetchResponse).toHaveLength(0);
  });

  test("removeIndexByProcess should work", async () => {
    const _index = new Index(db);
    const delResponse = await _index.removeIndexByProcess(processId);
    expect(delResponse).toBeDefined();
    const fetchResponse = await _index.fetchEntitiesByProcess(processId);
    expect(fetchResponse).toHaveLength(0);
  });

  test("removeIndexByEntity should work", async () => {
    const _index = new Index(db);
    await _index.createIndex(sampleIndex);
    const delResponse = await _index.removeIndexByEntity(entityId);
    expect(delResponse).toBeDefined();
    const fetchResponse = await _index.fetchEntitiesByProcess(processId);
    expect(fetchResponse).toHaveLength(0);
  });
});
