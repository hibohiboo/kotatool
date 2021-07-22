import { MyRepos } from '~/domain/webdb-sample/components/molecules/MyRepos'
import { UserDescription } from '~/domain/webdb-sample/components/molecules/UserDescription'
import type { Endpoints } from '@octokit/types'
import styles from './styles.module.css'
// ___________________________________________________________________________
//
type Props = {
  user: Endpoints['GET /users/{username}']['response']['data']
  repos: Endpoints['GET /user/repos']['response']['data']
}
// ___________________________________________________________________________
//
export function Template({ user, repos }: Props) {
  // 型を通すためについか
  if (typeof user.login !== 'string') return <>Error</>
  return (
    <div>
      <section className={styles.userDescription}>
        <UserDescription user={user} />
      </section>
      <section className={styles.myRepos}>
        <MyRepos username={user.login} repos={repos} />
      </section>
    </div>
  )
}
