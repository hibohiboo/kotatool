import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import config from './config'
const firebaseApp = initializeApp(config)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
