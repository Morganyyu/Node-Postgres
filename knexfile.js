const settings = require("./settings.json");

module.exports = {
  development: {
    client: "pg",
    connection: {
      filename: settings,
      host: settings.hostname,
      user: settings.user,
      password: settings.password,
      database: settings.database
    }
  }
};
