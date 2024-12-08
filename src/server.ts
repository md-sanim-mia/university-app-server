import { Server } from 'http';
import app from './app';
import confing from './app/confing';

import mongoose from 'mongoose';
let server: Server;
async function main() {
  try {
    await mongoose.connect(confing.database_url as string);

    server = app.listen(confing.port, () => {
      console.log(`app is listening on port ${confing.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
process.on('unhandledRejection', () => {
  console.log('unhandledRejection is detected i, shutting down ');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  process.exit(1);
});
