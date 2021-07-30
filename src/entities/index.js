const {PersistedEntity} = require("./base");

class IndexEntity extends PersistedEntity {
    constructor(index_obj) {
        super();
        this._index_obj = index_obj;
    }

    serialized() {
        return {
            id: this._id,
            entity_type: this._index_obj.entity_type,
            entity_id: this._index_obj.entity_id,
            process_id: this._index_obj.process_id,
            return_type: this._index_obj.return_type,
            created_at: this._created_at
        }
    }

    deserialized(db_data) {
        return db_data.map( (data) => {
            return {
                id: data.id,
                entity_type: data.entity_type,
                entity_id: data.entity_id,
                process_id: data.process_id,
                return_type: data.return_type,
                created_at: data.created_at
            }
        });
    }


    static get name() {
        return "Index";
    };

    static getEntityClass() {
        return IndexEntity;
    };
}

module.exports = {
    IndexEntity
}
