import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyD4JXFTDSTE4aLPTLQXTlZ_ExHEWVgOkaY",
  authDomain: "books-2226d.firebaseapp.com",
  databaseURL: "https://books-2226d.firebaseio.com",
  projectId: "books-2226d",
  storageBucket: "books-2226d.appspot.com",
  messagingSenderId: "1046623448881"
}

firebase.initializeApp(config)

export default firebase

export const database = firebase.database()
export const storage = firebase.storage()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
