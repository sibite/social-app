import Datastore from 'nedb';
import path from 'path';

const db = {
  users: new Datastore({
    filename: path.join(__dirname, './store/users'),
    autoload: true,
  }),
};

export default db;
