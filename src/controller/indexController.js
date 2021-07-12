const pushIndex = async (ctx, next) => {
    console.log('[KW] Called pushActivity');

    let cockpit;
    const actor_data = ctx.state.actor_data;
    const process_id = ctx.params.process_id;
    const response = await cockpit.pushActivity(process_id, actor_data);
    if (response && !response.error) {
        ctx.status = 202;
    } else {
        switch(response.error.errorType) {
            case 'activityManager':
                ctx.status = 404;
                ctx.body = response.error;
                break;
            default:
                ctx.status = 500;
                ctx.body = response.error;
                break;
        }
    }
};

module.exports = {
    pushIndex
}