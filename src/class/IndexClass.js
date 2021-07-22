
class Index {

    async testIndex() {
        console.log ('testIndex works');
    }

    // static getEntityClass() {
    //     return Index;
    // }
    //
    // static serialize(index) {
    //     return {
    //         uuid1: index._uuid1,
    //         entityType: index._entityType,
    //         entityId: index._entityId,
    //         processId: index._processId,
    //         returnType: index._returnType,
    //         created_at: index._created_at,
    //         deleted_at: index._deleted_at
    //     };
    // }
    //
    // static deserialize(serialized) {
    //     if (serialized) {
    //         const index = new Index(
    //             serialized.uuid1,
    //             serialized.entityType,
    //             serialized.entityId,
    //             serialized.processId,
    //             serialized.returnType,
    //             serialized.created_at,
    //             serialized.deleted_at
    //         );
    //         return index;
    //     }
    //     return undefined;
    // }
    //
    // constructor(uuid1, entityType, entityId, processId, returnType, created_at, deleted_at) {
    //     super();
    //
    //     this._uuid1 = uuid1;
    //     this._entityType = entityType;
    //     this._entityId = entityId;
    //     this._processId = processId;
    //     this._returnType = returnType;
    //     this._created_at = created_at;
    //     this._deleted_at = deleted_at;
    // }
    //
    // get uuid1() {
    //     return this._uuid1;
    // }
    //
    // get entityType() {
    //     return this._entityType;
    // }
    //
    // get entityId() {
    //     return this._entityId;
    // }
    //
    // get processId() {
    //     return this._processId;
    // }
    //
    // get returnType() {
    //     return this._returnType;
    // }


    /*


            static async fetch(activity_manager_id) {
                // const activity_manager = await this.getPersist().getActivityDataFromId(activity_manager_id);
                // if (activity_manager) {
                //     activity_manager.activities = await this.getPersist().getActivities(activity_manager.id);
                // }
                // return activity_manager;
            }

            static async get(activity_manager_id, actor_data) {
                // let result;
                // const activity_manager = await this.getPersist().getActivityDataFromId(activity_manager_id);
                // if (activity_manager) {
                //     const allowed_activities = await ActivityManager.checkActorPermission([activity_manager], actor_data);
                //     if (allowed_activities.length === 1) {
                //         result = allowed_activities[0];
                //         result.activities = await this.getPersist().getActivities(result.id);
                //     }
                // }
                // return result;
            }

*/
            //
            // set process_state_id(process_state_id) {
            //     // this._process_state_id = process_state_id;
            // }
            //
            // get status() {
            //     // return this._status;
            // }
            //
            // set status(status) {
            //     // this._status = status;
            // }
            //
            // get props() {
            //     // return this._props;
            // }
            //
            // set props(props) {
            //     // this._props = props;
            // }


}

module.exports.Index = Index;