import { Db } from 'mongodb';
import { connect } from 'mongoose';

import config from '../config';

export async function connectToUsersDB(): Promise<Db> {
  let connection;
  try {
    connection = await connect(
      config.userDatabaseUrl,
      { useNewUrlParser: true }
    );
    console.log('connected to users database');
  } catch (err) {
    console.log(err);
  }
  return connection.connection.db;
}
