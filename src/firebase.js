import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyA9BnlX96fMf7XiUVCFRsoQzG8DGERJkeY',
    authDomain: 'disneyplus-clone-a33d5.firebaseapp.com',
    projectId: 'disneyplus-clone-a33d5',
    storageBucket: 'disneyplus-clone-a33d5.appspot.com',
    messagingSenderId: '37918794208',
    appId: '1:37918794208:web:dbe9842dfe1dda522a4b85',
    measurementId: 'G-DRVLJKWRWG',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const storage = getStorage(app)

export { auth, provider, storage }
export default db
