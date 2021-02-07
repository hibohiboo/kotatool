import styles from '../styles/Count.module.scss'

const Count: React.FC<{ num: string }> = ({ num }) => {
  return <div className={styles.countWrapper}>{num}</div>
}
export default Count
