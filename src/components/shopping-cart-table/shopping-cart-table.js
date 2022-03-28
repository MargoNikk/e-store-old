import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    bookDeleteFromCart,
    bookIncreaseQnt,
    bookDecreaseQnt
} from '../../actions';

import './shopping-cart-table.css';

const ShoppingCartTable = ({
    items,
    total,
    onIncrease,
    onDecrease,
    onDelete }) => {

    const renderRow = (item, idx) => {
        const { id, title, count, price } = item;

        return (
            <tr className="table-secondary" key={idx}>
                <td>{idx + 1}</td>
                <td>{title}</td>
                <td className="count">
                    <button type="button"
                        className="btn"
                        onClick={() => onDecrease(id)}>
                        <i className="bi bi-dash-circle"></i>
                    </button>
                    <span>{count}</span>
                    <button type="button"
                        className="btn"
                        onClick={() => onIncrease(id)}>
                        <i className="bi bi-plus-circle"></i>
                    </button>
                </td>
                <td>${price}</td>
                <td className="action">
                    <button type="button"
                        className="btn btn-outline-danger"
                        onClick={() => onDelete(id)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    };

    const table = (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Count</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    items && items.map(renderRow)
                }

                <tr className="table-dark">
                    <td colSpan={4} className="total">Total:</td>
                    <td>${total}</td>
                </tr>
            </tbody>
        </table>
    );

    const message = (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Your cart is empty!</h4>
                <p className="card-text">Go back to the catalog and add something to the cart to see the total amount of the purchase here.</p>
                <Link className="card-link" to="/">Continue shopping</Link>
            </div>
        </div>
    );

    return (
        <div className="shopping-cart-table">
            <h3>Your order information</h3>

            {items.length ? table : message}
        </div>
    );
};

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal } }) => {
    return {
        items: cartItems,
        total: orderTotal
    }
};

const mapDispatchToProps = {
    onDelete: bookDeleteFromCart,
    onIncrease: bookIncreaseQnt,
    onDecrease: bookDecreaseQnt,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);