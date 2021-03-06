import { useEffect, useState } from 'react'
import CountersWithText from './organisms/CountersWithText'
import styles from './styles/Count.module.scss'
import { GasApi, UserApi, UserApiFp } from '~/lib/openapi/client-axios'
import axios from 'axios'

const api = new GasApi(undefined, undefined, axios.create())
const user = new UserApi()
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
        setAccessNumber(response.data.accessNumber)
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
