import { useEffect, useState } from 'react'
import CountersWithText from './organisms/CountersWithText'
import styles from './styles/Count.module.scss'
import { fetchAccessNumber } from '~/lib/apiClient/accessCounter'

const AccessCounter: React.FC = () => {
  const [accessNuber, setAccessNumber] = useState(0)
  const [accessStr, setAccessStr] = useState('LOADING')
  useEffect(() => {
    ;(async () => {
      try {
        const json = await fetchAccessNumber()
        setAccessStr('')
        setAccessNumber(json.accessNumber)
      } catch (_) {
        setAccessStr('ERROR')
      }
    })()
  }, [])

  return (
    <div className={styles.kotaAccessCounterWrapper}>
      {accessStr ? accessStr : <CountersWithText num={accessNuber} />}
    </div>
  )
}
export default AccessCounter
