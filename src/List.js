import React, { Component } from 'react';
import Book from './Book';
import map from 'lodash/map';
import glamorous from 'glamorous';

const Div = glamorous.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  width: '100%',
  margin: '0 auto'
})

class List extends Component {

  render(){
    return (
      <Div className='row'>
        {
          this.props.books
          ?
              map(this.props.books, (book) => {
                return <Book key={book.isbn13} book={book}/>
              })

          : ''
        }
      </Div>
    )
  }
}

export default List;
