/* eslint-disable no-unused-vars */
const {
  SystemTaskNode,
} = require("@fieldlink/workflow-engine/src/core/workflow/nodes");
const { Validator } = require("@fieldlink/workflow-engine/src/core/validators");
const obju = require("@fieldlink/workflow-engine/src/core/utils/object");
const Index = require("../class/IndexClass");
const { prepare } = require("@fieldlink/workflow-engine/src/core/utils/input");
const {
  ProcessStatus,
} = require("@fieldlink/workflow-engine/src/core/workflow/process_state");
const { logger } = require("../utils/logger");

class createIndexNode extends SystemTaskNode {
  static get rules() {
    const parametersRules = {
      parameters_has_indexObj: [obju.hasField, "indexObj"],
      parameters_indexObj_has_valid_type: [
        obju.isFieldTypeIn,
        "indexObj",
        ["object"],
      ],
    };
    return {
      ...super.rules,
      parameters_nested_validations: [
        new Validator(parametersRules),
        "parameters",
      ],
    };
  }

  validate() {
    return createIndexNode.validate(this._spec);
  }

  _preProcessing({ bag, input, actor_data, environment, parameters }) {
    return prepare(this._spec.parameters.indexObj, {
      bag: bag,
      result: input,
      actor_data: actor_data,
      environment: environment,
    });
  }

  async run(
    {
      bag = {},
      input = {},
      actor_data = {},
      environment = {},
      process_id = null,
      parameters = {},
    },
    lisp
  ) {
    try {
      logger.debug("[Indexer] createIndex Node");
      const executionData = this._preProcessing({
        bag,
        input,
        actor_data,
        environment,
        parameters,
      });
      const indexObj = {
        entity_type: executionData.entity_type,
        entity_id: executionData.entity_id,
        process_id,
      };
      const _idx = new Index();
      const result = await _idx.createIndex(indexObj);
      return [result, ProcessStatus.RUNNING];
    } catch (err) {
      logger.error("Indexer failed", err);
      return this._processError(err, { bag });
    }
  }
}

module.exports = createIndexNode;
