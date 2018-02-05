import React, { Component } from 'react';
import { storage, database } from './firebase';
import glamorous from 'glamorous';

const BookBox = glamorous.div({
  width: 200,
  margin: '8px 16px',
  border: '1px solid #c8c8c8'
})

class Book extends Component {
  constructor(props) {
    super(props)
    this.bookRef = database.ref('/books').child(`${this.props.book.isbn13}`)
    this.coversRef = storage.ref('/covers')
  }

  // componentDidMount() {
  //   const imageRef = this.coversRef.child(`${this.props.book.isbn13}.jpeg`).getDownloadURL()
  //   imageRef.then((snapshot) => {
  //     this.setState({cover: snapshot})
  //   }).catch((reason)=> {
  //     console.log(`Handle rejected promise ${reason.message_} here.`);
  //   })
  // }

  getData() {
    return new Promise((resolve, reject) => {
      let image = new Image()
      image.src = 'https://pbs.twimg.com/profile_images/774297805116407808/NhxKlL4B.jpg'

      if ( image.complete && image.naturalWidth > 0 ) {
        console.log('image complete')
        return Promise.resolve( image )
      }
      image.onload = () => resolve( image );
  		image.onerror = () => reject( 'image onError Reject' );
    })
  }

  getFromApi() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open("GET", `https://www.googleapis.com/books/v1/volumes?q=isbn:${this.props.book.isbn13}`, true)
      xhr.onload = () => {
        console.log(xhr.status);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      }
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send()
    })
  }

  onClickUpdateHandle() {
    if (this.props.book.cover === '') {
      // this.getData().then((image) => this.uploadImage(image))
      this.getFromApi().then((response) => {

        const object = JSON.parse(response)
        const coverImageUrl = object.items[0].volumeInfo.imageLinks.smallThumbnail
        console.log(coverImageUrl);
        // this.setState({cover: coverImageUrl})
        this.bookRef.update({cover: coverImageUrl})
      })
    }
  }

  uploadImage(image) {
    const uploadTask = this.coversRef.child(`${this.props.book.isbn13}.jpeg`).put(image)
    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100 + '%');
    })
    uploadTask.then((snapshot) => {
      this.setState({cover: snapshot.downloadURL})
    }).catch((error) => alert(error.message))
  }

  render() {
    return (
      <BookBox>
        <img className='bookCover' src={this.props.book.cover} alt={this.props.book.title} />
        <h4>{this.props.book.title}</h4>
        <p>{this.props.book.author}</p>
        <button className='btn tiny' onClick={this.onClickUpdateHandle.bind(this)}>get info</button>
      </BookBox>
    )
  }
}

export default Book;
