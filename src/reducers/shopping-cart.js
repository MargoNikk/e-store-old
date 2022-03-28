/**
 * @param {Array} items 
 * @param {Number} itemId 
 * @returns {Obj} 
 */
const findItemById = (items, itemId) => {
    const itemIdx = items.findIndex(({ id }) => id === itemId);

    return {
        item: items[itemIdx],
        idx: itemIdx
    };
}

/**
 * Update items in the shopping cart
 * @param {Array} cartItems 
 * @param {Obj} item 
 * @param {Number} idx 
 * @returns {Array}
 */
const updateCartItems = (cartItems, item, idx) => {
    if (item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1),
        ];
    }

    if (idx === -1) {
        return [
            ...cartItems,
            item
        ];
    }

    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1),
    ];
};

/**
 * Update cart item info
 * @param {Object} item 
 * @param {Number} itemIdx 
 * @param {Number} quantity 
 * @returns {Object}
 */
const updateItem = (item, itemIdx, quantity) => {
    if (itemIdx !== -1) {
        return {
            ...item,
            count: item.count + quantity,
        };
    }

    return {
        id: item.id,
        title: item.title,
        count: 1,
        price: item.price
    };
};

/**
 * Update data in shopping cart: delete, increase, decrease
 * @param {Obj} state 
 * @param {Number} id 
 * @param {Number} quantity 
 * @returns {Obj}
 */
const updateOrder = (state, id, quantity) => {
    const { bookList: { books }, shoppingCart: { cartItems } } = state;
    const { item, idx } = findItemById(cartItems, id);
    const book = idx !== -1 ?
        item :
        books.find((book) => book.id === id);
    const newItem = updateItem(book, idx, quantity);

    return {
        cartItems: updateCartItems(cartItems, newItem, idx),
        orderTotal: state.shoppingCart.orderTotal + newItem.price * quantity,
        orderCount: state.shoppingCart.orderCount + quantity
    };
};

const updateShoppingCart = (state, action) => {
    if (state === undefined) {
        return {
            cartItems: [],
            orderTotal: 0,
            orderCount: 0
        }
    }

    switch (action.type) {
        case 'BOOK_ADD_TO_CART':
            return updateOrder(state, action.payload, 1);

        case 'BOOK_DELETE_FROM_CART':
            const { item } = findItemById(state.shoppingCart.cartItems, action.payload);

            return updateOrder(state, action.payload, -item.count);

        case 'INCREASE_BOOK_CART':
            return updateOrder(state, action.payload, 1);

        case 'DECREASE_BOOK_CART':
            return updateOrder(state, action.payload, -1);

        default:
            return state.shoppingCart;
    };
};

export default updateShoppingCart;