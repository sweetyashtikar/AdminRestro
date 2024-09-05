import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/UpdateRestaurant.css'; // Import the styles

const UpdateRestaurant = () => {
    const [restaurant, setRestaurant] = useState({ name: '', description: '', location: '', phoneNumber: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const result = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
                setRestaurant(result.data);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        };
        fetchRestaurant();
    }, [id]);

    const handleChange = (e) => {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/restaurants/${id}`, restaurant);
            navigate('/');
        } catch (error) {
            console.error('Error updating restaurant:', error);
        }
    };

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="update-restaurant-container">
            <h1>Update Restaurant</h1>
            <button className="back-button" onClick={handleBack}>Back</button>
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
                <button type="submit">Update Restaurant</button>
            </form>
        </div>
    );
};

export default UpdateRestaurant;
