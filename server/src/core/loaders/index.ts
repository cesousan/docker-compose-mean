import { connectToUsersDB } from './mongoose';

export default async ({ expressApp }: any) => {
  const mongooseUserConnection = await connectToUsersDB();
};
