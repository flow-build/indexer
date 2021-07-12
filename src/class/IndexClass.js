
class Index extends PersistedEntity {
    constructor(uuid1, entityType, entityId, processId, returnType, created_at, deleted_at) {
        super();
    }


    static getEntityClass() {
        return Index;
    }

    static serialize(index) {
        return {
            id: activity_manager._id,
            created_at: activity_manager._created_at,
            type: activity_manager._type,
            process_state_id: activity_manager._process_state_id,
            status: activity_manager._status,
            props: activity_manager._props,
            parameters: activity_manager._parameters
        };
    }

    static deserialize(serialized) {
        if (serialized) {
            const activity_manager = activity_manager_factory.getActivityManager(
                serialized.type,
                serialized.process_state_id,
                serialized.status || serialized.activity_status,
                serialized.props,
                serialized.parameters
            );
            activity_manager._id = serialized.id;
            activity_manager._created_at = serialized.created_at;

            return activity_manager;
        }
        return undefined;
    }




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


    set process_state_id(process_state_id) {
        // this._process_state_id = process_state_id;
    }

    get status() {
        // return this._status;
    }

    set status(status) {
        // this._status = status;
    }

    get props() {
        // return this._props;
    }

    set props(props) {
        // this._props = props;
    }

}