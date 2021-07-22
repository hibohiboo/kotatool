import type { Endpoints } from '@octokit/types'
import Link from 'next/link'
// ___________________________________________________________________________
//
type Props = {
  username: string
  repos: Endpoints['GET /user/repos']['response']['data']
}
// ___________________________________________________________________________
//
export function MyRepos({ username, repos }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>stargazers count</th>
          <th>forks count</th>
          <th>owner type</th>
          <th>private</th>
          <th>name</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((repo) => (
          <tr key={repo.id}>
            <td>{repo.stargazers_count}</td>
            <td>{repo.forks_count}</td>
            <td>{repo.owner?.type}</td>
            <td>{repo.private ? 'o' : '-'}</td>
            <td>
              <Link prefetch={false} href={`/github/my/${repo.name}`}>
                <a>{repo.name}</a>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
