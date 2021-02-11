import { useEffect, useState } from 'react'
import CountersWithText from './organisms/CountersWithText'
import styles from './styles/Count.module.scss'

const apiUrl = process.env.NEXT_PUBLIC_GAS_ACCESS_NUMBER

const AccessCounter: React.FC = () => {
  const [accessNuber, setAccessNumber] = useState(0)
  const [accessStr, setAccessStr] = useState('LOADING')
  useEffect(() => {
    if (!apiUrl) return
    ;(async () => {
      try {
        const response = await fetch(apiUrl, { method: 'POST' })
        const json: { accessNumber: number } = await response.json()
        setAccessStr('')
        setAccessNumber(json.accessNumber)
      } catch (_) {
        setAccessStr('ERROR')
      }
    })()
  }, [])

  return (
    <div className={styles.accessCounterWrapper}>
      {accessStr ? accessStr : <CountersWithText num={accessNuber} />}
    </div>
  )
}
export default AccessCounter
