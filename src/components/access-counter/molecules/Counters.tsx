import Count from '../atoms/Count'
import styles from '../styles/Count.module.scss'
const numberOfDigists = 6

const Counters: React.FC<{ num: number }> = ({ num }) => {
  const numbers = String(num).padStart(numberOfDigists, '0')
  return (
    <div className={styles.kotaWrapper}>
      {[...numbers].map((n, i) => (
        <Count num={n} key={`${n}${i}`} />
      ))}
    </div>
  )
}
export default Counters
