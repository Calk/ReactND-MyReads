import React from 'react'

class Book extends React.Component {

  moveBook = (event) => {
    let shelfName = event.target.options[event.target.selectedIndex].text;
    this.props.onMoveBook(this.props.book, event.target.value, shelfName);
  };

  render() {
    let book = this.props.book;
    return (
      <div className="book">
        <div className="book-top">
            <img className="book-cover"
              src={book.imageLinks === undefined ? "" : book.imageLinks.thumbnail === undefined ? "" : book.imageLinks.thumbnail}
              style={{ maxHeight: 200, width: "auto", height: "auto" }}
              alt="book cover"/>
          <div className="book-shelf-changer">
            <select onChange={this.moveBook} value={book.shelf === undefined ? "none" : book.shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title === undefined ? "" : book.title}</div>
        <div className="book-authors">{book.authors === undefined ? "" : book.authors.join(', ')}</div>
      </div>
    );
  }
};

export default Book;
