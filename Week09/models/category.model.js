const dbModule = require('./database'); // Ensure correct path to your database module
const schema = 'pdakhoa'; // Replace with your actual schema name
const tableName = 'Categories'; // Replace with your actual table name

const db = dbModule(schema);

module.exports = {
    all: async () => {
        try {
            const categories = await db.all(tableName);
            // order by CatID
            categories.sort((a, b) => a.CatID - b.CatID);
            return categories;
        } catch (error) {
            throw error;
        }
    },
    add: async (category) => {
        try {
            const result = await db.add(tableName, category);
            return result;
        } catch (error) {
            throw error;
        }
    },
    one: async (categoryId) => {
        try {
            const category = await db.one(tableName, 'CatID', categoryId);
            console.log('category', category);
            return category;
        } catch (error) {
            throw error;
        }
    },
    update: async (categoryId, category) => {
        try {
            console.log(categoryId, category);
            const result = await db.update(tableName, 'CatID', categoryId, category);
            return result;
        } catch (error) {
            throw error;
        }
    },
    delete: async (categoryId) => {
        try {
            const result = await db.delete(tableName, 'CatID', categoryId);
            return result;
        } catch (error) {
            throw error;
        }
    }
};