const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const devDbConfig = {
  host: process.env.DEV_DB_HOST || 'mysql_dev',
  user: process.env.DEV_DB_USER || 'root',
  password: process.env.DEV_DB_PASSWORD || 'rootpass',
  database: process.env.DEV_DB_NAME || 'wordpress',
};

const maxwellLogPath = process.env.MAXWELL_LOG || '/var/lib/maxwell/maxwell.log';

async function main() {
  try {
    const connection = await mysql.createConnection(devDbConfig);
    console.log('Connected to dev DB');

    // Voor demo: lees een klein stukje van Maxwell log
    const logData = await fs.promises.readFile(path.resolve(maxwellLogPath), 'utf-8');
    console.log('Maxwell log snippet:', logData.slice(0, 300));

    // TODO: Parse de logregels en sync naar dev DB

    await connection.end();
  } catch (err) {
    console.error('Sync consumer error:', err);
  }
}

main();