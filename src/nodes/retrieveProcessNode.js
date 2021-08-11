const {
  SystemTaskNode,
} = require("@fieldlink/workflow-engine/src/core/workflow/nodes");
const { Validator } = require("@fieldlink/workflow-engine/src/core/validators");
const obju = require("@fieldlink/workflow-engine/src/core/utils/object");
const Index = require("../class/IndexClass");
const {
  ProcessStatus,
} = require("@fieldlink/workflow-engine/src/core/workflow/process_state");
const { logger } = require("../utils/logger");

class retrieveProcessesNode extends SystemTaskNode {
  static get rules() {
    const parametersRules = {
      parameters_has_entity_id: [obju.hasField, "entity_id"],
      parameters_entity_id_has_valid_type: [
        obju.isFieldTypeIn,
        "entity_id",
        ["string"],
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
    return retrieveProcessesNode.validate(this._spec);
  }

  async _run(executionData) {
    try {
      logger.debug("[Indexer] retrieveProcesses node");
      const _idx = new Index();
      const result = await _idx.fetchProcessByEntity(
        executionData.entity_id,
        executionData.limit
      );
      return [result, ProcessStatus.RUNNING];
    } catch (err) {
      logger.error("retrieveProcesses node failed", err);
      throw err;
    }
  }
}

module.exports = retrieveProcessesNode;
