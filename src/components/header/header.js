import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import CartLink from '../cart-link';

import './header.css';

const Header = ({ count, total }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand"> E-Store</Link>
                <Link to="cart" className="cart">
                    <CartLink total={total} amount={count} />
                </Link>
            </div>
        </nav>
    );
};

const mapStateToProps = ({ shoppingCart: { orderCount, orderTotal } }) => {
    return {
        count: orderCount,
        total: orderTotal
    }
};

export default connect(mapStateToProps)(Header);