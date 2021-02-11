const latestLoginDateKey = 'latestLoginDate'
export const getLatestLoginDate = () => {
  return localStorage.getItem(latestLoginDateKey)
}

export const setLatestLoginDate = (date: string) => {
  return localStorage.setItem(latestLoginDateKey, date)
}
