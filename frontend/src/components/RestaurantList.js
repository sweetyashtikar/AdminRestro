import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/RestaurantList.css'; // Import the styles

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:5000/api/restaurants');
            setRestaurants(result.data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/restaurants/${id}`);
            setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="restaurant-list-container">
            <h1>Restaurant List</h1>
            <div className="add-link">
                <Link to="/add">Add New Restaurant</Link>
            </div>
            <ul className="restaurant-list">
                {restaurants.map((restaurant) => (
                    <li key={restaurant._id}>
                        <span>{restaurant.name} - {restaurant.location}</span>
                        <div className="actions">
                            <Link to={`/update/${restaurant._id}`}>Edit</Link>
                            <button onClick={() => handleDelete(restaurant._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantList;
