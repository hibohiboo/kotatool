import Image from 'next/image'
import type { Endpoints } from '@octokit/types'
import styles from './styles.module.css'
// ___________________________________________________________________________
//
type Props = {
  user: Endpoints['GET /users/{username}']['response']['data']
}
// ___________________________________________________________________________
//
export function UserDescription({ user }: Props) {
  return (
    <div className={styles.module}>
      <div className={styles.avatar}>
        {typeof user.avatar_url === 'string' ? (
          <Image src={user.avatar_url} width="230" height="230" alt="avatar" />
        ) : (
          <></>
        )}
      </div>
      <div className={styles.description}>
        <h1>{user.name}</h1>
        <h3>{user.bio}</h3>
        {user.email && <p>{user.email}</p>}
        {user.twitter_username && (
          <p>
            <a href={`https://twitter.com/${user.twitter_username}`}>
              @{user.twitter_username}
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
