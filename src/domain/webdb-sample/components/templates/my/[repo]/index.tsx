import { RepoCommits } from '~/domain/webdb-sample/components/molecules/RepoCommits'
import { RepoDescription } from '~/domain/webdb-sample/components/molecules/RepoDescription'
import type { Endpoints } from '@octokit/types'
import Link from 'next/link'
// ___________________________________________________________________________
//
type Props = {
  repo: Endpoints['GET /repos/{owner}/{repo}']['response']['data']
  commits: Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data']
}
// ___________________________________________________________________________
//
export function Template({ repo, commits }: Props) {
  return (
    <div>
      <Link href="/github/my">
        <a>&lt; Back</a>
      </Link>
      <RepoDescription repo={repo} />
      <RepoCommits commits={commits} />
    </div>
  )
}
