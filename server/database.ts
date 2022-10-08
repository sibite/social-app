import Datastore from 'nedb';
import path from 'path';
import { UserType } from './api-types/auth';

const db = {
  users: new Datastore<UserType>({
    filename: path.join(__dirname, '../database/users'),
    autoload: true,
  }),
  feed: new Datastore({
    filename: path.join(__dirname, '../database/feed'),
    autoload: true,
  }),
  comments: new Datastore({
    filename: path.join(__dirname, '../database/comments'),
    autoload: true,
  }),
  messages: new Datastore({
    filename: path.join(__dirname, '../database/messages'),
    autoload: true,
  }),
};

export default db;
