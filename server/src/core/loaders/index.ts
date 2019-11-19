import { connectToUsersDB } from './mongoose';
import expressLoader from './express';

export default async ({ expressApp }: any) => {
  await connectToUsersDB();

  await expressLoader({ app: expressApp });
};
