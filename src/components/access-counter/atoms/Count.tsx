import styles from '../styles/Count.module.scss'

const Count: React.FC<{ num: string }> = ({ num }) => {
  return <span className={styles.kotaFrame}>{num}</span>
}
export default Count
