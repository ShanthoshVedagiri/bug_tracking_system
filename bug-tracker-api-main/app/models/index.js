const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
mongoose.set("debug",true);
db.mongoose = mongoose;
db.url = dbConfig.url;
// db.
db.users= require("./user.model")(mongoose);
db.bugs= require("./bugs.model")(mongoose);

module.exports = db;
