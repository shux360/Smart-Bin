const express = require('express');
const Issue = require('../models/issue');
const router = express.Router();

// Create a new issue
router.post('/report-issue', async (req, res) => {
    const { name, location, date, categories, issueType, otherIssue, issueDescription } = req.body;
    try {
        const newIssue = new Issue({ name, location, date, categories, issueType, otherIssue, issueDescription });
        await newIssue.save();
        res.status(201).json({ message: 'Issue reported successfully', newIssue });
    } catch (error) {
        res.status(400).json({ error: 'Error reporting issue' });
        console.log(error);
    }
});

// Get all issues
router.get('/issues', async (req, res) => {
    try {
        const issues = await Issue.find();
        res.json(issues);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching issues' });
    }
});

// Get a specific issue by ID
router.get('/issues/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        res.json(issue);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching issue' });
    }
});

// Update an issue by ID
router.put('/issues/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location, date, categories, issueType, otherIssue, issueDescription } = req.body;
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(id, { name, location, date, categories, issueType, otherIssue, issueDescription }, { new: true });
        if (!updatedIssue) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        res.json(updatedIssue);
    } catch (error) {
        res.status(400).json({ error: 'Error updating issue' });
    }
});

// Delete an issue by ID
router.delete('/issues/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedIssue = await Issue.findByIdAndDelete(id);
        if (!deletedIssue) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        res.json({ message: 'Issue deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting issue' });
    }
});

module.exports = router;