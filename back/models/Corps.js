const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Corps = new Schema({
                    No: {
                            type: Number,
                            required: true,
                            default: null,
                    },
                    CorpId: {
                            type: String,
                            required: true,
                            default: null,
                    },
                    CorpName: {
                            type: String,
                            required: true,
                            default: null,
                    },
                    CompanyRegNo: {
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
                    },
                });


module.exports = mongoose.model('Corps', Corps);
