const { IndexKnexPersist } = require("./knex");
const { PersistorSingleton } = require("./persist");

class PersistorProvider {
  static getPersistor(...args) {
    if (PersistorSingleton.instance) {
      return PersistorSingleton.instance;
    }

    const db = args[0];
    const class_map = {
      Index: [IndexKnexPersist, db],
    };
    return new PersistorSingleton(class_map);
  }
}

module.exports = {
  PersistorProvider,
};
