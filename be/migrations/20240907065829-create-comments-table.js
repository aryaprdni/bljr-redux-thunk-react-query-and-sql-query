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
  db.createTable('comments', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: 'string',
      length: 500
    },
    post_id: {  
      type: 'int',
    },
    user_id: {
      type: 'int'
    }
  }, function(err) {
    if (err) return err;
    
    db.addForeignKey('comments', 'posts', 'fk_post', {
      'post_id': 'id'
    }, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }, callback);

    db.addForeignKey('comments', 'users', 'fk_user', {
      'user_id': 'id'
    }, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }, callback);
  });
};

exports.down = function(db) {
  return db.dropTable('comments');
};

exports._meta = {
  "version": 1
};
