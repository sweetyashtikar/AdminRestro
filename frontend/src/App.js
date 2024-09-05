import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddRestaurant from './components/AddRestaurant';
import RestaurantList from './components/RestaurantList';
import UpdateRestaurant from './components/UpdateRestaurant';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RestaurantList />} />
                <Route path="/add" element={<AddRestaurant />} />
                <Route path="/update/:id" element={<UpdateRestaurant />} />
            </Routes>
        </Router>
    );
}

export default App;
