import firebase from 'firebase/app'
import { db } from '~/lib/firebase/initFirebase'
import { toSerializeObject, toTimestamp } from '~/lib/firestore/utils'

interface UserData {
  uid: string
  displayName: string
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
    point: 0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }
  if (!userRef.exists) users.doc(uid).set(userData)
  const before = userRef.data()
  users.doc(uid).set({
    ...userData,
    point: before.point,
    createdAt: before.createdAt,
  })
}
