const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    avatar: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    available: {
        type: String,
        required: true,
    },
});

const Data = mongoose.model('Data', dataSchema);

module.exports = {
    Data
};
