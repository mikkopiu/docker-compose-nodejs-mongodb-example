'use strict';

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

module.exports = class ListStorage {
  constructor() {
    this.ready = false;
    this.collection = null;

    MongoClient.connect('mongodb://db_1:27017/list', (err, db) => {
      if (err) {
        throw err;
      }
      db.createCollection('list', (err, collection) => {
        if (err) {
          throw err;
        }
        this.ready = true;
        this.collection = collection;
      });
    });
  }

  toArray(callback) {
    if (!this.ready) {
      return callback(new Error('not ready'));
    }
    return this.collection.find().toArray((err, list) => {
      if (err) {
        return callback(err);
      }
      return callback(null, list);
    });
  }

  push(item, callback) {
    let doc = {item: item};
    this.collection.insert(doc, {w: 1}, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }

  remove(_id, callback) {
    this.collection.remove({_id: ObjectID(_id)}, {w: 1}, (err, result) => {
      if (err) {
        return callback (err);
      }
      return callback(null);
    });
  }
}
