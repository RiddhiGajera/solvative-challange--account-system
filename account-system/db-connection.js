const mongoose = require('mongoose');

module.exports = {
     async initDb(dbProperties) {
        console.log('database connection..');
        await mongoose.connect(dbProperties.url, { useNewUrlParser: true });
    }
}