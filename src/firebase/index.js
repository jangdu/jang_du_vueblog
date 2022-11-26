// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDje-sgFNOkiyR3w5OFTZxiSLrw636Url8',
  authDomain: 'jang-du-blog.firebaseapp.com',
  projectId: 'jang-du-blog',
  storageBucket: 'jang-du-blog.appspot.com',
  messagingSenderId: '556159515902',
  appId: '1:556159515902:web:70fc91bd8180102858f9af'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {
  db
}
