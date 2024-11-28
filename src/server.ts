import app from './app';
import confing from './app/confing';

import mongoose from 'mongoose';

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(confing.database_url as string);

    app.listen(confing.port, () => {
      console.log(`app is listening on port ${confing.port}`);
    });
  } catch (error) {
    console.log(error);
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
