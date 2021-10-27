import { config } from 'dotenv';
config();
const configuration = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_TOKEN_EXPIRATION,
  },
  // aws: {
  //   access_key: process.env.AWS_ACCESS_KEY_ID,
  //   secret_key: process.env.AWS_SECRET_ACCESS_KEY,
  //   bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
  // },
  // sellandsign: {
  //   contract_definition_id: process.env.SS_CONTRACT_DEFINITION_ID,
  //   j_token: process.env.SS_J_TOKEN,
  //   actor_id: process.env.SS_ACTOR_ID,
  //   vendor_email: process.env.SS_VENDOR_EMAIL,
  //   host: process.env.SS_HOST,
  // },
  // client: {
  //   url: process.env.WEB_APP_URL,
  // },
};

export default configuration;
