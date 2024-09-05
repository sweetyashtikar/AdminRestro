const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Restaurant name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Restaurant description is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); // Basic validation for phone number
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'Restaurant phone number is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
