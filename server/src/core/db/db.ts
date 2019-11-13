import { connect, model, Schema } from 'mongoose';

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

// DB schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export const Item = model('item', ItemSchema);
