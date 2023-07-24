const users = require("../db/users");

const fetchAll = async () => {
  return users;
};

const fetch = async (id) => {
  let found = users.some((user) => user.id == id);
  if (!found) {
    throw "not found";
  }
  let user = users.filter((user) => user.id == id);

  return user;
};
module.exports = { fetchAll, fetch };
