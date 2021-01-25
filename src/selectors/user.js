module.exports.userSelector = (user) => {
  const { _id, name, email } = user;
  return { _id, name, email };
};
