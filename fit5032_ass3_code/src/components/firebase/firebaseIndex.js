import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBhUpBTmYQej24LO_Znh60jbMw42OyXqrc',
  authDomain: 'fit5032-9ff5c.firebaseapp.com',
  projectId: 'fit5032-9ff5c',
  storageBucket: 'fit5032-9ff5c.appspot.com',
  messagingSenderId: '332555063511',
  appId: '1:332555063511:web:2d0f757ea86940e433e092',
  measurementId: 'G-DRT4PFSBEX'
}

const firebaseApp = initializeApp(firebaseConfig)
const database = getFirestore(firebaseApp)

export { database }
