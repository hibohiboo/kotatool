import { db } from '~/lib/firebase/initFirebase'
import * as constants from '~/lib/constants'
import type { User as FirebaseUser } from 'firebase/auth'
import {
  collection,
  doc,
  FieldValue,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'

interface UserData {
  uid: string
  displayName: string
  loginCount: number
  point: number
  latestLoginDate: string
  createdAt: FieldValue
  updatedAt: FieldValue
}

const getUsers = () => {
  return collection(db, 'users')
}

export const updateUser = async (
  { uid, displayName }: FirebaseUser,
  latestLoginDate: string,
) => {
  const users = getUsers()
  const userRef = await getDoc(doc(users, uid))
  const userData: UserData = {
    uid,
    displayName,
    latestLoginDate,
    loginCount: 0,
    point: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  if (!userRef.exists) {
    setDoc(doc(users, uid), userData)
    return
  }
  const before = userRef.data()
  setDoc(doc(users, uid), {
    ...userData,
    loginCount: before.loginCount + 1,
    point: before.point + constants.userPoints.dailyLogin,
    createdAt: before.createdAt,
  })
}
