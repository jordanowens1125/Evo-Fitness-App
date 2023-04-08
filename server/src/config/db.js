/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

import { connect } from 'mongoose';
require('dotenv').config({ path: __dirname + '/.env' });
const DB_STRING = process.env.DB_STRING;
const connectDB = async () => {
  try {
    const db = await connect(DB_STRING);
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
