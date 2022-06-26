import axios from 'axios'
import { CovidType } from 'types/covid'

export const fetchKrData = async () => {
  const { data } = await axios.get('https://api.covid19api.com/total/dayone/country/kr')
  return data
}

const currentDate: Date = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth() + 1

export const getMonthNameArray = () => {
  const MONTH_NAME = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  let monthArr = []
  for (let i = 0; i < currentMonth; i += 1) monthArr.push(MONTH_NAME[i])

  return monthArr
}

const pastSixMonthArray = () => {
  let newMonthArr = []
  for (let i = 1; i <= currentMonth; i += 1) newMonthArr.push(i)

  if (newMonthArr.length > 6) return newMonthArr.slice(-6)

  return newMonthArr
}

const findPreviousMonth = (covidArray: CovidType[]) => {
  const monthArray = pastSixMonthArray()

  return monthArray.map((month) => {
    if (month > 9) return covidArray.filter((covid: CovidType) => covid.Date.includes(`${currentYear}-${month}`))
    return covidArray.filter((covid: CovidType) => covid.Date.includes(`${currentYear}-0${month}`))
  })
}

export const getMonthFinalData = (covidArray: CovidType[]) => {
  const data = findPreviousMonth(covidArray)
  let finalData = []
  for (let i = 0; i < data.length; i += 1) finalData.push(data[i].at(-1))

  return finalData
}
