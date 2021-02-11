import { useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '~/lib/firebase/initFirebase'
import routes from '~/lib/routes'
import type firebase from 'firebase'

export const useSignIn = () => {
  const [currentUser, setCurrentUser] = useState<null | firebase.User>(null)

  useEffect(() => {
    const signIn = async () => {
      try {
        await auth.signInAnonymously()
      } catch (e) {
        console.error('認証エラー', e)
      }
    }

    // 監視を解除する関数を返す
    return auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('auth changed', user.getIdTokenResult())
        setCurrentUser(user)
      } else {
        ;(async () => await signIn())()
      }
    })
  }, [])
  return currentUser
}

export const useSignOut = () => {
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        auth.signOut()
      }
    })
  }, [])
}

export const useAuth = () => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<null | firebase.User>(null)

  useLayoutEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        user ? setCurrentUser(user) : router.push(routes.home)
      }),
    [],
  )
  return currentUser
}
