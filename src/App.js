import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './Components/BookShelf'
import { Route } from 'react-router-dom'
import SearchTopBar from './Components/SearchTopBar'
import SearchButton from './Components/SearchButton'
import './App.css'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  fetchAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  };

  componentDidMount() {
    this.fetchAllBooks();
  }

  moveBook = (book, shelf, NameOfShelf) => {
    if (book.shelf !== shelf) {

      // Register current shelf in API and only then update information on frontend
      BooksAPI.update(book, shelf).then(data => {
        book.shelf = shelf;
        this.setState(previousState => {
          let books = previousState.books.filter(s => s.id !== book.id);
          books.push(book); // Add book to current list of books in state
          return {books};
        })
      }).then(() => {
        NotificationManager.info(`'${book.title}' changed to shelf '${NameOfShelf}'`, '');
      });
    }
  };

  render() {
    const wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead')
    const currentlyReading = this.state.books.filter(book => book.shelf === 'currentlyReading')
    const read = this.state.books.filter(book => book.shelf === 'read')

    return (
      <div className="app">

        {/* Render search page */}
        <Route path="/search" render={() => (
          <SearchTopBar onMoveBook={this.moveBook} shelfBooks={this.state.books} />
        )}/>

        {/* Render Index page */}
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title="Currently Reading" shelfID="currentlyReading" books={currentlyReading} onMoveBook={this.moveBook}/>
                <BookShelf title="Want to Read" shelfID="wantToRead" books={wantToRead} onMoveBook={this.moveBook}/>
                <BookShelf title="Read" shelfID="read" books={read} onMoveBook={this.moveBook}/>
              </div>
            </div>
            <SearchButton />
          </div>
        )}/>
        <NotificationContainer/>
      </div>
    )
  }
}

export default BooksApp
