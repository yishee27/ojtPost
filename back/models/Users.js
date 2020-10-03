const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
                    No: {
                            type: Number,
                            required: true,
                            default: null,
                    },
                    Company: {
                            type: Number,
                            required: true,
                            default: null,
                    },
                    UserId: {
                            type: String,
                            required: true,
                            default: null,
                    },
                    UserPW: {
                            type: String,
                            required: true,
                            default: null,
                    },
                    UserName: {
                            type: String,
                            required: true,
                            default: null,
                    },
                    UserEmail: {
                            type: String,
                            required: false,
                            default: null,
                    },
                    UserMobile: {
                            type: String,
                            required: false,
                            default: null,
                    },
                    UserLevel: {
                            type: String,
                            required: false,
                            default: null,
                    },
                    CreatedDate: {
                            type: Date,
                            required: true,
                            default: Date.now,
                    },
                    ModifiedDate: {
                            type: Date,
                            required: false,
                            default: null,
                    },});


module.exports = mongoose.model('Users', Users);

