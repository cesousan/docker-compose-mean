import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  userDatabaseUrl: `${process.env.USERS_DB_ADDR}/${process.env.USERS_DB_NAME}`,
  clientOrigin: `${process.env.CLIENT_ORIGIN}`,
};
