import Link from 'next/link'
const LinkButton: React.FC<{ href: string; text: string }> = ({
  href,
  text,
}) => {
  return (
    <Link href={href}>
      <a>{text}</a>
    </Link>
  )
}
export default LinkButton
