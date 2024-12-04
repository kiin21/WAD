const { TableName } = require('pg-promise');

const initOptions = {
    capSQL: true
};
const pgp = require('pg-promise')(initOptions);

const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 30 // use up to 30 connections
};

const db = pgp(cn);

// Function to check the database connection
const checkConnection = async () => {
    try {
        await db.connect();
    } catch (error) {
        throw new Error('Database connection failed');
    }
};

module.exports = (scheme) => {
    return {
        all: async (tableName) => {
            await checkConnection();
            try {
                const data = await db.any(`SELECT * FROM "${scheme}"."${tableName}"`);
                return data;
            } catch (error) {
                throw error;
            }
        },
        add: async (tableName, entity) => {
            await checkConnection();
            try {
                const table = new pgp.helpers.TableName({ table: tableName, schema: scheme });
                const sql = pgp.helpers.insert(entity, null, table);
                const result = await db.oneOrNone(`${sql} RETURNING *`);
                return result;
            } catch (error) {
                throw error;
            }
        },
        one: async (tableName, fieldName, fieldVal) => {
            await checkConnection();
            try {
                const table = new pgp.helpers.TableName({ table: tableName, schema: scheme });
                const sql = `SELECT * FROM ${table} WHERE "${fieldName}" = $1`;
                const data = await db.oneOrNone(sql, [fieldVal]);
                return data;
            } catch (error) {
                throw error;
            }
        },
        update: async (tableName, fieldName, fieldVal, entity) => {
            await checkConnection();
            try {
                const table = new pgp.helpers.TableName({ table: tableName, schema: scheme });
                const sql = pgp.helpers.update(entity, null, table) + ` WHERE "${fieldName}" = $1 RETURNING *`;
                const result = await db.oneOrNone(sql, [fieldVal]);
                return result;
            } catch (error) {
                throw error;
            }
        },
        delete: async (tableName, fieldName, fieldVal) => {
            await checkConnection();
            try {
                const table = new pgp.helpers.TableName({ table: tableName, schema: scheme });
                const sql = `DELETE FROM ${table} WHERE "${fieldName}" = $1`;
                const result = await db.result(sql, [fieldVal]);
                return result;
            } catch (error) {
                throw error;
            }
        },
        any: async (tableName, fieldName, fieldVal) => {
            await checkConnection();
            try {
                const table = new pgp.helpers.TableName({ table: tableName, schema: scheme });
                const sql = `SELECT * FROM ${table} WHERE "${fieldName}" = $1`;
                const data = await db.any(sql, [fieldVal]);
                return data;
            } catch (error) {
                throw error;
            }
        }
    };
};