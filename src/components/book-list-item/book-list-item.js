import React from "react";

import './book-list-item.css'

const BookListItem = ({ book, onAddToCart }) => {
    const { title, author, price, imgUrl } = book;

    return (
        <div className="book-item">
            <img className="image" src={imgUrl} alt={title} />
            <div className="info">
                <div>
                    <h5>{title}</h5>
                    <p>{author}</p>
                    <p className='price'>${price}</p>
                </div>
                <button type="button"
                    className="btn btn-primary"
                    onClick={onAddToCart}>
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default BookListItem;