const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const validateDataWithSchema = async (schema, data) => {
  const _ajv = new Ajv({ allErrors: true });
  addFormats(_ajv);
  const validateSchema = _ajv.compile(schema);
  const isValid = await validateSchema(data);
  return {
    isValid,
    errors: validateSchema.errors,
  };
};

module.exports = {
  validateDataWithSchema,
};
