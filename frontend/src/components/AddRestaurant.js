import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/AddRestaurant.css'; // Import the styles

const AddRestaurant = () => {
    const [restaurant, setRestaurant] = useState({ name: '', description: '', location: '', phoneNumber: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/restaurants', restaurant);
            navigate('/');
        } catch (error) {
            console.error(error.response.data.error);
        }
    };

    return (
        <div className="add-restaurant-container">
            <h1>Add Restaurant</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={restaurant.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    name="description"
                    value={restaurant.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    name="location"
                    value={restaurant.location}
                    onChange={handleChange}
                    placeholder="Location"
                    required
                />
                <input
                    name="phoneNumber"
                    value={restaurant.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                />
                <button type="submit">Add Restaurant</button>
            </form>
        </div>
    );
};

export default AddRestaurant;
