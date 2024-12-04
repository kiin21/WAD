const dbModule = require('./database');
const schema = 'pdakhoa';
const tableName = 'Users';

const db = dbModule(schema);

module.exports = {
    all: async () => {
        try {
            const users = await db.all(tableName);
            return users;
        } catch (error) {
            throw error;
        }
    },
    add: async (user) => {
        try {
            user.Name = 'Test';
            user.DOB = new Date();
            user.Permission = 1;
            const result = await db.add(tableName, user);
            return result;
        } catch (error) {
            throw error;
        }
    },
    one: async (username) => {
        try {
            const user = await db.one(tableName, 'Username', username);
            return user;
        } catch (error) {
            throw error;
        }
    },
    any: async (username) => {
        try {
            console.log(username);
            
            const users = await db.any(tableName, 'Username', username);
            return users;
        } catch (error) {
            throw error;
        }
    },
    any: async (username) => {
        try {
            const users = await db.any(tableName, 'Username', username);
            console.log(users, 'dsfdjshguihsdijnfvjisndfguisdf');

            return users;
        } catch (error) {
            throw error;
        }
    },
};