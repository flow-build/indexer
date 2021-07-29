const { PersistedEntity } = require("./base");

class IndexEntity extends PersistedEntity{
    static get name() {
        return "Index";
    };

    static getEntityClass() {
        return IndexEntity;
    };

    constructor(actor_obj) {
        super();
    }

    serialized() {
        return {
            id: this._id,
            created_at: this._created_at
        }
    }

}

module.exports = {
    IndexEntity
}
