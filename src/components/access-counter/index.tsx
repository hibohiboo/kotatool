import { useEffect, useState } from 'react'
import CountersWithText from './organisms/CountersWithText'
import styles from './styles/Count.module.scss'
import { GasApi } from '~/lib/openapi/client-axios'
const api = new GasApi()
const apiUrl = process.env.NEXT_PUBLIC_GAS_ACCESS_NUMBER

const AccessCounter: React.FC = () => {
  const [accessNuber, setAccessNumber] = useState(0)
  const [accessStr, setAccessStr] = useState('LOADING')
  useEffect(() => {
    if (!apiUrl) return
    ;(async () => {
      try {
        // const response = await fetch(apiUrl, { method: 'POST' })
        // const json: { accessNumber: number } = await response.json()
        // setAccessNumber(json.accessNumber)
        const response = await api.getAccessCounter()
        setAccessNumber(response.data.accessNuber)
        console.log('access', response.data)

        setAccessStr('')
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
