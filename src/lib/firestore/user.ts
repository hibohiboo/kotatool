import firebase from 'firebase/app'
import { db } from '~/lib/firebase/initFirebase'
import * as constants from '~/lib/constants'

interface UserData {
  uid: string
  displayName: string
  loginCount: number
  point: number
  latestLoginDate: string
  createdAt: firebase.firestore.FieldValue
  updatedAt: firebase.firestore.FieldValue
}

const getUsers = () => {
  return db.collection('users')
}

export const updateUser = async (
  { uid, displayName }: firebase.User,
  latestLoginDate: string,
) => {
  const users = getUsers()
  const userRef = await users.doc(uid).get()
  const userData: UserData = {
    uid,
    displayName,
    latestLoginDate,
    loginCount: 0,
    point: 0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }
  if (!userRef.exists) {
    users.doc(uid).set(userData)
    return
  }
  const before = userRef.data()
  users.doc(uid).set({
    ...userData,
    loginCount: before.loginCount + 1,
    point: before.point + constants.userPoints.dailyLogin,
    createdAt: before.createdAt,
  })
}
