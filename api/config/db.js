import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const { DB_CONNECT_STRING } = process.env;

const config = {
  connectionString: DB_CONNECT_STRING,

  allowExitOnIdle: true,
};

const pool = new Pool(config);

export default pool;
