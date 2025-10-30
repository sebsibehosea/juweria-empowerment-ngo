// server/db.js
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const {
    Pool
} = pkg;

const connectionString = process.env.DATABASE_URL;

// Prefer discrete PG env vars when present; otherwise use DATABASE_URL
const hasDiscrete = !!(process.env.PGHOST || process.env.PGUSER || process.env.PGDATABASE);

let poolConfig;
if (hasDiscrete) {
    const host = process.env.PGHOST || 'localhost';
    const port = Number(process.env.PGPORT || 5432);
    const user = process.env.PGUSER;
    const password = process.env.PGPASSWORD;
    const database = process.env.PGDATABASE;

    poolConfig = {
        host,
        port,
        user,
        password,
        database
    };

    if (!user || !database) {
        console.warn('[DB] PGHOST/PGUSER/PGDATABASE provided but incomplete. Please configure all required vars.');
    } else {
        console.log(`[DB] Using discrete PG config host=${host} port=${port} db=${database}`);
    }
} else if (connectionString && typeof connectionString === 'string') {
    poolConfig = {
        connectionString
    };
    try {
        const shown = connectionString.replace(/(:)([^:@\\/]+)(@)/, '$1****$3');
        console.log('[DB] Using DATABASE_URL', shown);
    } catch {
        console.log('[DB] Using DATABASE_URL');
    }
} else {
    // Fallback to sensible local defaults to avoid connecting with OS username
    const host = 'localhost';
    const port = 5432;
    const user = 'postgres';
    const password = '0861';
    const database = 'juweria';

    console.warn('[DB] No env provided. Falling back to local defaults postgres:0861@localhost:5432/juweria');
    poolConfig = {
        host,
        port,
        user,
        password,
        database
    };
}

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
    console.error('Unexpected PG client error', err);
});

export default {
    query: (text, params) => pool.query(text, params),
    pool,
};