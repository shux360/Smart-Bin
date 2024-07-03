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

//Editing garbage details
router.put('/edit-garbage-details/:id', async (req, res) => {
    try {
        console.log(req.body);
        const id = req.params.id;
        const { location, categories } = req.body;
        const updateGarbage = {
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
        };
        const updatedGarbage = await Garbage.findByIdAndUpdate(id, updateGarbage, { new: true });

        res.status(200).json({
            updatedGarbage,
            message: 'Garbage details updated successfully'
        });

    } catch (error) {
        console.error('Error updating garbage entry:', error.message);
        res.status(500).json({ error: error.message });
    }
});

//deleting garbage details
router.delete('/delete-garbage-details/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteGarbage = await Garbage.findByIdAndDelete(id);

        res.status(200).json({
            deleteGarbage,
            message: 'Garbage details deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting garbage entry:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;