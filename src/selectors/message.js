module.exports.messageSelector = (message) => {
  const { _id, userId, content, createdAt, updatedAt } = message;
  return { _id, userId, content, createdAt, updatedAt };
};
