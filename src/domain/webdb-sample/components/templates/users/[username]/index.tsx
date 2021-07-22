import { UserDescription } from '~/domain/webdb-sample/components/molecules/UserDescription'
import { UserRepos } from '~/domain/webdb-sample/components/molecules/UserRepos'
import type { Endpoints } from '@octokit/types'
import styles from './styles.module.css'
// ___________________________________________________________________________
//
type Props = {
  user: Endpoints['GET /users/{username}']['response']['data']
  repos: Endpoints['GET /users/{username}/repos']['response']['data']
}
// ___________________________________________________________________________
//
export function Template({ user, repos }: Props) {
  const username = typeof user.login !== 'string' ? '' : user.login
  return (
    <div>
      <section className={styles.userDescription}>
        <UserDescription user={user} />
      </section>
      <section className={styles.userRepos}>
        <UserRepos username={username} repos={repos} />
      </section>
    </div>
  )
}
