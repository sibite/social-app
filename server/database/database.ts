import Datastore from 'nedb';
import path from 'path';

const db = {
  users: new Datastore({
    filename: path.join(__dirname, './store/users'),
    autoload: true,
  }),
  feed: new Datastore({
    filename: path.join(__dirname, './store/feed'),
    autoload: true,
  }),
  media: new Datastore({
    filename: path.join(__dirname, './store/media'),
    autoload: true,
  }),
};

export default db;
