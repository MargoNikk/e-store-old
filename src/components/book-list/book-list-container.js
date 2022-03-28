import React, { Component } from "react";
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose, bindActionCreators } from "redux";
import Spiner from '../spiner';
import ErrorIndicator from '../error-indicator';

import BookList from './book-list';

class BookListContainer extends Component {
    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        const { books, loading, error, onAddToCart } = this.props;

        if (loading) {
            return <Spiner />
        }

        if (error) {
            return <ErrorIndicator value={"Books didn't load!"}/>
        }

        return <BookList books={books} onAddToCart={onAddToCart} />
    }
}

const mapStateToProps = ({ bookList: { books, loading, error } }) => {
    return { books, loading, error };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { bookstoreService } = ownProps; // ownProps - ger other props from another components from compose func
    return bindActionCreators({
        fetchBooks: fetchBooks(bookstoreService),
        onAddToCart: bookAddedToCart
    }, dispatch);
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);