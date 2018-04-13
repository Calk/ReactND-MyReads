import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'

class SearchTopBar extends React.Component {
  state = {
    results: []
  };

  onSearchChange = (event) => {
    let searchText = event.target.value;
    if (searchText === "") {
      this.setState({ results: [] });
      return;
    }

    BooksAPI.search(searchText, 10).then(data => {
      if (data === undefined) {
        this.setState({ results: [] });
        return;
      }

      if (!Array.isArray(data)) {
        this.setState({ results: data });
        return;
      }

      let results = data.map((book) => {
        let matchedBooks = this.props.shelfBooks.filter(shelfBook => shelfBook.id === book.id);
        if (matchedBooks.length === 1) {
          book["shelf"] = matchedBooks[0].shelf;
        }
        return book;
      });
      this.setState({ results });
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.onSearchChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <BookShelf title="SearchResults" books={this.state.results} onMoveBook={this.props.onMoveBook}/>
        </div>
      </div>
    );
  }
};

export default SearchTopBar;
