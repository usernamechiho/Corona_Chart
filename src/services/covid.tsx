import axios from 'axios'
import Spinner from 'routes/_Component/Spinner'
import { CovidType } from 'types/covid'

export const fetchKrData = async () => {
  const { data } = await axios.get('https://api.covid19api.com/total/dayone/country/kr')
  return data
}

export const fetchJpData = async () => {
  const { data } = await axios.get('https://api.covid19api.com/total/dayone/country/jp')
  return data
}

export const fetchWorldwideData = async () => {
  const { data } = await axios.get('https://api.covid19api.com/summary')
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

export const confirmedNumberComparedToYesterday = (covidDataArray: any[]) => {
  if (covidDataArray.length) {
    const getLastTwoData = covidDataArray.slice(-2)
    const confirmedValueCalculation = getLastTwoData[1].Active - getLastTwoData[0].Active
    return [getLastTwoData[1].Date.split('T')[0], confirmedValueCalculation]
  }

  return <Spinner />
}
