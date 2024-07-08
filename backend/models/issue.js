const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        streetName: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        postalcode: {
            type: String,
            required: true
        }
    },
    date: {
        type: Date,
        required: true
    },
    categories: [{
        type: String,
        enum: ['Missed', 'Not Visited', 'Technical', 'Other'],
        required: true
    }],
    issueType: {
        type: String,
        required: true
    },
    otherIssue: {
        type: String
    },
    issueDescription: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Issue = mongoose.model('Issue', IssueSchema);
module.exports = Issue;