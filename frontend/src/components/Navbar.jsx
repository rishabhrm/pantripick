import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [visible, setVisible] = useState(false);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <h2 className="logo">Logo</h2>
                <ul className="nav-links">
                    <NavLink to='/' className="nav-item">HOME</NavLink>
                    <NavLink to='/collection' className="nav-item">COLLECTION</NavLink>
                    <NavLink to='/about' className="nav-item">ABOUT</NavLink>
                    <NavLink to='/contact' className="nav-item">CONTACT</NavLink>
                </ul>
                <div className="nav-icons">
                    <button className="search-btn">Search</button>
                    <div className="profile-dropdown">
                        <button className="profile-btn">Profile</button>
                        <div className="dropdown-content">
                            <p>My Profile</p>
                            <p>Orders</p>
                            <p>Logout</p>
                        </div>
                    </div>
                    <Link to='/cart' className="cart">Cart (10)</Link>
                    <button className="menu-btn" onClick={() => setVisible(true)}>Menu</button>
                </div>
            </div>

            {visible && (
                <div className="mobile-menu">
                    <button className="back-btn" onClick={() => setVisible(false)}>Back</button>
                    <NavLink onClick={() => setVisible(false)} to='/' className="mobile-item">HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/collection' className="mobile-item">COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/about' className="mobile-item">ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/contact' className="mobile-item">CONTACT</NavLink>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
