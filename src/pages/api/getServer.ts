import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import * as constants from '~/lib/constants'
export default (req, res) => {
  const jstDate = utcToZonedTime(new Date(), 'Asia/Tokyo')
  const latestLoginDate = format(jstDate, constants.DATE_FORMAT)
  res.statusCode = 200
  res.json({ latestLoginDate })
}
