const { v1: uuid } = require("uuid");
const { PersistorSingleton } = require("../persist/persist");

class BaseEntity {
  constructor() {
    this._id = uuid();
    this._created_at = new Date();
  }

  get id() {
    return this._id;
  }

  get created_at() {
    return this._created_at;
  }
}

class PersistedEntity extends BaseEntity {
  static getEntityClass() {
    throw Error("Subclass and implement");
  }

  static getPersist() {
    return new PersistorSingleton().getPersistInstance(
      this.getEntityClass().name
    );
  }

  constructor() {
    super();
  }

  getPersist() {
    return this.constructor.getPersist();
  }

  async save() {
    return await this.constructor.getPersist().save(this.serialized());
  }
}

module.exports = {
  BaseEntity: BaseEntity,
  PersistedEntity: PersistedEntity,
};
