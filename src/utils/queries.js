exports.createMessageTable = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR DEFAULT '',
  message VARCHAR NOT NULL
  )
`;

exports.insertMessages = `
INSERT INTO messages(name, message)
VALUES ('imon', 'firstMessage'),
      ('tamim', 'second message')
`;

exports.dropMessagesTable = "DROP TABLE messages";
