
class KnexPersist {
    constructor(db, table) {
        this._db = db;
        this._table = table;
    }

    async save(obj) {
        const is_update = obj.id && await this.get(obj.id);
        if (is_update) {
            return await this._update(obj.id, obj);
        }
        return await this._create(obj);
    }

    async get(obj_id) {
        return await this._db
            .select("*")
            .from(this._table)
            .where({ "id": obj_id })
            .first();
    }

    async getAll() {
        return await this._db(this._table).select();
    }

    async delete(obj_id) {
        return await this._db(this._table)
            .delete()
            .where("id", obj_id);
    }

    async _create(obj) {
        try {
            const obj_id = await this._db(this._table)
                .insert(obj)
                .returning("id");
            return { obj_id: obj_id[0] };
        } catch (err) {
            return { error: err };
        }
    }

    async _update(obj_id, obj) {
        try {
            await this._db(this._table)
                .where("id", obj_id)
                .update(obj);
            return { obj_id };
        } catch (err) {
            return { error: err };
        }
    }
}

class IndexKnexPersist extends KnexPersist {
    constructor(db) {
        super(db, "index");
    }

    async delete(obj_id) {
        await this._db("hierarchy_members")
            .delete()
            .where("hierarchy_members.actor_id", obj_id)
            .orWhere("hierarchy_members.parent_id", obj_id);

        await this._db("actor_auth")
            .delete()
            .where("actor_auth.actor_id", obj_id);

        await this._db("actor_profile")
            .delete()
            .where("actor_profile.actor_id", obj_id);

        await this._db("auth_adhoc")
            .delete()
            .where("auth_adhoc.actor_id", obj_id);

        return await this._db(this._table)
            .delete()
            .where("id", obj_id);
    }

}


module.exports = {
    KnexPersist: KnexPersist,
    IndexKnexPersist: IndexKnexPersist
};
