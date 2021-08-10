class KnexPersist {
  constructor(db, table) {
    this._db = db;
    this._table = table;
  }

  async save(obj) {
    const is_update = obj.id && (await this.get(obj.id));
    if (is_update) {
      return await this._update(obj.id, obj);
    }
    return await this._create(obj);
  }

  async get(obj_id) {
    return await this._db
      .select("*")
      .from(this._table)
      .where({ id: obj_id })
      .first();
  }

  async delete(id) {
    return await this._db(this._table).delete().where("id", id);
  }

  async _create(obj) {
    try {
      const obj_id = await this._db(this._table).insert(obj).returning("id");
      return { id: obj_id[0] };
    } catch (err) {
      return { error: err };
    }
  }
}

class IndexKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, "index");
  }

  async getProcessByEntityType(entityType) {
    let dbData = await this._db(this._table)
      .select("entity_id")
      .count("process_id")
      .where("entity_type", entityType)
      .groupBy("entity_id");

    return dbData;
  }

  async getByEntity(entityId, limit) {
    let dbData = await this._db(this._table)
      .select("*")
      .where("entity_id", entityId)
      .limit(limit)
      .orderBy("created_at");

    return dbData;
  }

  async getByProcess(processId, limit) {
    let dbData = await this._db(this._table)
      .select("*")
      .where("process_id", processId)
      .limit(limit)
      .orderBy("created_at");

    return dbData;
  }

  async deleteAllByProcess(processId) {
    return await this._db(this._table)
      .where("process_id", processId)
      .delete(["id", "entity_id", "entity_type"]);
  }

  async deleteAllByEntity(entityId) {
    return await this._db(this._table)
      .where("entity_id", entityId)
      .delete(["id", "process_id"]);
  }
}

module.exports = {
  KnexPersist,
  IndexKnexPersist,
};
