const pool = require("../config/db");
const {
  insertMessages,
  dropMessagesTable,
  createMessageTable,
} = require("./queries");

const executeQueryArray = async (arr) =>
  new Promise((resolve) => {
    const stop = arr.length;
    arr.forEach(async (q, index) => {
      await pool.query(q);
      if (index + 1 === stop) resolve();
    });
  });

module.exports.executeQueryArray = executeQueryArray;

exports.dropTables = () => executeQueryArray([dropMessagesTable]);
exports.createTables = () => executeQueryArray([createMessageTable]);
exports.insertIntoTables = () => executeQueryArray([insertMessages]);
