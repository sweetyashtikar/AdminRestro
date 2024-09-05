// src/components/DeleteRestaurant.js
import React from 'react';
import axios from 'axios';

const DeleteRestaurant = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/restaurants/${id}`);
      onDelete(id); // Callback to update the restaurant list after deletion
    } catch (error) {
      console.error('Error deleting restaurant');
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteRestaurant;
