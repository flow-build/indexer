const { SystemTaskNode } = require('@fieldlink/workflow-engine/src/core/workflow/nodes');
const { Validator } = require('@fieldlink/workflow-engine/src/core/validators');
const obju = require('@fieldlink/workflow-engine/src/core/utils/object');
// const { prepare } = require('@fieldlink/workflow-engine/src/core/utils/input');
// const uuidV1 = require('uuid/v1');
// const uuidV4 = require('uuid/v4');
// const { ProcessStatus } = require('@fieldlink/workflow-engine/src/core/workflow/process_state');
// const { Logger } = require('../services');

class testNode extends SystemTaskNode {
    static get rules() {
        const parametersRules = {
            parameters_has_test: [obju.hasField, 'test'],
            parameters_test_has_valid_type: [
                obju.isFieldTypeIn,
                'test',
                ['string', 'object'],
            ],
        };
        return {
            ...super.rules,
            parameters_nested_validations: [
                new Validator(parametersRules),
                'parameters',
            ],
        };
    }

    validate() {
        return GenerateUUID.validate(this._spec);
    }

    _preProcessing({
                       bag, input, actor_data: actorData, environment,
                   }) {

    }

    async _run(executionData) {
        // const logger = Logger.getInstance();
        try {
           console.log("Test node works");
        } catch (err) {
            // logger.error('Generate UUID node failed', err);
            throw err;
        }
    }
}

module.exports = GenerateUUID;
