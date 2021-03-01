import React from 'react'
import Counters from '../molecules/Counters'
import styles from '../styles/Count.module.scss'

const CountersWithText: React.FC<{ num: number }> = ({ num }) => {
  return (
    <div className={styles.kotaWithTextWrapper}>
      <div>あなたは</div>
      <div className={styles.kotaWithTextWrapperCenter}>
        <Counters num={num} />
        人目
      </div>
      <div>のお客様です</div>
    </div>
  )
}
export default CountersWithText
