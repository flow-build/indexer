
exports.test = async () => {
    console.log('[KW] Called test');




    return {
        "status": 200,
        "body": 'test works'
    } ;
}

exports.test();