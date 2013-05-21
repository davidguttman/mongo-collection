var dbs, mongo;

mongo = require('mongoskin');

dbs = {};

module.exports = function(host, dbname, collection) {
  var db, dbkey;
  dbkey = "" + host + "/" + dbname;
  if (!dbs[dbkey]) {
    dbs[dbkey] = mongo.db("" + dbkey + "?auto_reconnect", {
      safe: true
    });
  }
  db = dbs[dbkey];
  return db.collection(collection);
};
