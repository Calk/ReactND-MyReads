import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
  render() {
    const books = this.props.books;

    if (books.error === "empty query") {
      return (
        <div>Not a single book found</div>
      )
    } else if (books.length === 0) {
      return (
        <div></div>
      )
    } else {
      const bookList = books.map((book) =>
        <li key={book.id}>
          <Book book={book} onMoveBook={this.props.onMoveBook} />
        </li>
      );
      return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {bookList}
            </ol>
          </div>
        </div>
      );
    }
  }
};

export default BookShelf;
