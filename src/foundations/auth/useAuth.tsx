import { useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
import format from 'date-fns/format'
import { auth } from '~/lib/firebase/initFirebase'
import routes from '~/lib/routes'
import apiPath from '~/lib/apiPath'
import * as constants from '~/lib/constants'
import { updateUser } from '~/lib/firestore/user'
import { setLatestLoginDate, getLatestLoginDate } from '~/lib/localStorage'
import { signInAnonymously, User as FirebaseUser } from 'firebase/auth'
import { useIsomorphicEffect } from '~/utils/utilHooks'

const signIn = async () => {
  try {
    await signInAnonymously(auth)
  } catch (e) {
    console.error('認証エラー', e)
  }
}

// サーバサイドとクライアントサイドの時刻がずれていないことを確認
const checkDateServerSide = async (date: string) => {
  const response = await fetch(apiPath.getServerData)
  const { latestLoginDate } = await response.json()
  return latestLoginDate === date
}

const dailyLogin = async (user: FirebaseUser) => {
  const latestLoginDate = format(new Date(), constants.DATE_FORMAT)

  if (
    getLatestLoginDate() !== latestLoginDate &&
    (await checkDateServerSide(latestLoginDate))
  ) {
    await updateUser(user, latestLoginDate)
  }
  setLatestLoginDate(latestLoginDate)
}

export const useSignIn = () => {
  const [currentUser, setCurrentUser] = useState<null | FirebaseUser>(null)

  useEffect(() => {
    // 監視を解除する関数を返す
    return auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
        ;(async () => await dailyLogin(user))()
      } else {
        ;(async () => await signIn())()
      }
    })
  }, [])
  return currentUser
}

export const useSignOut = () => {
  useEffect(() => {
    const signOut = async () => {
      try {
        await auth.signOut()
      } catch (e) {
        console.error('サインアウトエラー', e)
      }
    }
    return auth.onAuthStateChanged((user) => {
      if (user) {
        ;(async () => await signOut())()
      }
    })
  }, [])
}

export const useAuth = () => {
  const router = useRouter()
  const isomorphicEffect = useIsomorphicEffect()
  const [currentUser, setCurrentUser] = useState<null | FirebaseUser>(null)

  isomorphicEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        user ? setCurrentUser(user) : router.push(routes.home)
      }),
    [router],
  )
  return currentUser
}
