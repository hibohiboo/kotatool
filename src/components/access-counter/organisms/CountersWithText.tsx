import Counters from '../molecules/Counters'
import styles from '../styles/Count.module.scss'

const CountersWithText: React.FC<{ num: number }> = ({ num }) => {
  return (
    <div className={styles.withTextWrapper}>
      <div>あなたは</div>
      <div className={styles.withTextWrapperCenter}>
        <Counters num={num} />
        人目
      </div>
      <div>のお客様です</div>
    </div>
  )
}
export default CountersWithText
