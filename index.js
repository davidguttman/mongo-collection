var dbs, mongo, es;

mongo = require('mongoskin');
es = require('event-stream');

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

module.exports.stream = function(collection, query, opts) {
  var cursor = collection.find(query, opts);

  var poll = function(count, callback) {
    var self = this;
    var onDoc = function(err, doc) {
      if (err) {
        return callback(err);
      }

      if (doc) {
        self.emit('data', doc);
      } else {
        self.emit('end');
      }
      
      callback();
    }

    cursor.nextObject(onDoc);
  }

  var stream = es.readable(poll);

  return stream;
};



