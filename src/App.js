import React, { Component } from 'react';
import { database } from './firebase';
import List from './List';

class App extends Component {
  constructor(props) {
    super(props)
    this.booksRef = database.ref('/books')

    this.state = {
      books: {}
    }
  }

  componentDidMount() {
    this.booksRef.orderByKey().limitToLast(5).endAt('9780385499842').on('value', (snapshot) => {
      this.setState({books: snapshot.val()});
    })
  }

  render() {
    return (
      <div className="App">
        <List books={this.state.books}/>
      </div>
    );
  }
}

export default App;
