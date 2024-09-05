const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// Add a new restaurant
router.post('/', async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific restaurant by ID
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a restaurant
router.put('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a restaurant
router.delete('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
        res.status(200).json({ message: 'Restaurant deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
