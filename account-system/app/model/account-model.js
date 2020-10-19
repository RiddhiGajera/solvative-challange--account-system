const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const accountSchema = new Schema({
    username: {
        type: String,
        required: true, 
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    transferedAt: {
        type: Number,
        required: true
    }
});

const accountModel = mongoose.model('Account', accountSchema);

module.exports.AccountSchemaModel = accountModel;

