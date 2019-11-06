import { connect } from 'mongoose';

const USERS_DB = `${process.env.USERS_DB_ADDR}/${process.env.USERS_DB_NAME}`;
export async function connectToUsersDB() {
  try {
    await connect(
      USERS_DB,
      { useNewUrlParser: true }
    );
    console.log('connected to users database');
  } catch (err) {
    console.log(err);
  }
}
