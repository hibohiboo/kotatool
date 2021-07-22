import { octokit } from '~/domain/github/fetcher'

export const getStaticProps = async () => {
  const repos = await octokit.request(`GET /users/{username}/repos`, {
    username: process.env.GITHUB_USER,
  })
  return { props: { repos } }
}
export default function Page(props: any) {
  if (!props.repos.data) return <>error!</>
  console.log(props.repos)
  return <div>Hello Next.js</div>
}
