const { v1:uuid } = require("uuid");
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
        return new PersistorSingleton()
            .getPersistInstance(this.getEntityClass().name);
    }

    constructor() {
        super();
    }

    getPersist() {
        return this.constructor.getPersist();
    }

    async save() {
        return await this.constructor.getPersist()
            .save(this.serialized());
    }

    async update() {
        return await this.constructor.getPersist()
            .save(this.updatedSerialized());
    }

    async fetch(obj_id, account_id) {
        let db_data;
        if (obj_id) {
            db_data = await this.constructor.getPersist()
                .get(obj_id, account_id);
            return this.deserialized([db_data]);
        } else {
            db_data = await this.constructor.getPersist()
                .getAll(account_id);
            return this.deserialized(db_data);
        }
    }

    async delete(obj_id) {
        return await this.constructor.getPersist()
            .delete(obj_id);
    }
}

module.exports = {
    BaseEntity: BaseEntity,
    PersistedEntity: PersistedEntity
};
