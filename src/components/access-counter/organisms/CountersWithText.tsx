import Counters from '../molecules/Counters'
import styles from '../styles/Count.module.scss'

const CountersWithText: React.FC<{ num: number }> = ({ num }) => {
  return (
    <div>
      あなたは
      <Counters num={num} />
      人目のお客様です
    </div>
  )
}
export default CountersWithText
