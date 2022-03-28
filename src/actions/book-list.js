const booksLoad = (newBooks) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks
    };
};

const booksRequest = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'
    };
};

const booksError = (error) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    };
};

// thunk action creator -> func returns func
const fetchBooks = (bookstoreService) => () => (dispatch) => {
    dispatch(booksRequest());
    bookstoreService.getBooks()
        .then((data) => dispatch(booksLoad(data)))
        .catch((err) => dispatch(booksError(err)));
};

export default fetchBooks;