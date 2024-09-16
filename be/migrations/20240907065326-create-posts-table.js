'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('posts', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: 'string',
      length: 100
    },
    content: {
      type: 'string'
    },
    user_id: {
      type: 'int'
    }
  }, function (err) {
    if (err) return callback(err);
    db.addForeignKey('posts', 'users', 'fk_user', {
      'user_id': 'id'
    }, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }, callback);
  });
};

exports.down = function(db) {
  return db.dropTable('posts');
};

exports._meta = {
  "version": 1
};
