const { MongoClient } = require('mongodb');

const URL = process.env.MONGO_URL;
let dbConnection;

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect(URL)
            .then((client) => {
                console.log(`Connect to MongoDB`);
                dbConnection = client.db();
                return cb();
            })
            .catch((err) => cb(err));
    },
    getDB: () => dbConnection,
};
