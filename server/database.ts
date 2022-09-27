import Datastore from 'nedb';
import path from 'path';

const db = {
  users: new Datastore({
    filename: path.join(__dirname, './database/users'),
    autoload: true,
  }),
  feed: new Datastore({
    filename: path.join(__dirname, './database/feed'),
    autoload: true,
  }),
};

export default db;
