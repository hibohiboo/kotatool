import { Button } from '~/domain/webdb-sample/components/atoms/Button'
import { InputText } from '~/domain/webdb-sample/components/atoms/InputText'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './styles.module.css'
// ___________________________________________________________________________
//
export function Template() {
  const [name, setName] = React.useState('')
  const router = useRouter()
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`/github/users/${name}`)
  }
  return (
    <div className={styles.module}>
      <h1>Next.js x Github API</h1>
      <p className={styles.description}>
        Enter the user account name you want to look up.
      </p>
      <form className={styles.form} onSubmit={submitHandler}>
        <p>
          <InputText
            type="text"
            onChange={(event) => {
              setName(event.target.value)
            }}
          />
        </p>
        <p>
          <Button type="submit">SEARCH USER</Button>
        </p>
      </form>
    </div>
  )
}
