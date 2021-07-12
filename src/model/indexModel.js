async function pushIndex(process_id, actor_data) {
    try {
        return await new Index(name, description, blueprint_spec).save();
    } catch (e) {
        return {
            error: {
                errorType: 'pushIndex',
                message: e.message
            }
        }
    }
}

module.exports = {
    pushIndex
}