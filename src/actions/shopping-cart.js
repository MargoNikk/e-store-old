const bookAddedToCart = (bookId) => {
    return {
        type: 'BOOK_ADD_TO_CART',
        payload: bookId
    }
};

const bookDeleteFromCart = (bookId) => {
    return {
        type: 'BOOK_DELETE_FROM_CART',
        payload: bookId
    }
};

const bookIncreaseQnt = (bookId) => {
    return {
        type: 'INCREASE_BOOK_CART',
        payload: bookId
    }
};

const bookDecreaseQnt = (bookId) => {
    return {
        type: 'DECREASE_BOOK_CART',
        payload: bookId
    }
};

export {
    bookAddedToCart,
    bookDeleteFromCart,
    bookIncreaseQnt,
    bookDecreaseQnt
};