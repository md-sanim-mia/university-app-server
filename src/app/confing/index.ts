import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,

  database_url: process.env.DATABASE_URL,
  bcrypt_solt_pass: process.env.bcrypt_solt,
  defult_password: process.env.DEFULT_PASSWORD,
};
