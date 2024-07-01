const router = require('express').Router();
const Garbage = require('../models/garbage');


// Adding garbage details
router.post('/garbage-details', async (req, res) => {
    try {
        console.log(req.body);
        const {location, categories } = req.body;
        const newGarbage = new Garbage({

            location: {
                streetName: location.streetName,
                city: location.city,
                province: location.province,
                country: location.country,
                postalCode: location.postalCode,
                // latitude: req.body.location.latitude,
                // longitude: req.body.location.longitude
            },
            categories: categories
        });

        // Save 
        const saveGarbage = await newGarbage.save();


        res.status(201).json({
            saveGarbage,
            message: 'Garbage details added successfully'
        });

    } catch (error) {
        console.error('Error creating garbage entry:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;