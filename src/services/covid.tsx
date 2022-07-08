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
  const monthArr = []
  for (let i = 0; i < currentMonth; i += 1) monthArr.push(MONTH_NAME[i])

  return monthArr
}

const pastSixMonthArray = () => {
  const newMonthArr = []
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
  const finalData = []
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

export const deathStatsObject = (covidDataArray: any[], monthNameArray: string[]) => {
  const dataArray = getMonthFinalData(covidDataArray)
  const monthArray = monthNameArray

  const result = dataArray.map((item: any) => {
    const monthNumber = item.Date.split('-')[1]
    const Month = monthArray[monthNumber - 1]
    return {
      Month,
      Death: item.Deaths,
      label: `${item.Deaths.toLocaleString()} 명`,
    }
  })
  return result
}

export const activeStatsObject = (covidDataArray: any[], monthNameArray: string[]) => {
  const dataArray = getMonthFinalData(covidDataArray)
  const monthArray = monthNameArray

  const result = dataArray.map((item: any) => {
    const monthNumber = item.Date.split('-')[1]
    const Month = monthArray[monthNumber - 1]

    return {
      Month,
      Confirmed: item.Confirmed,
      label: `${item.Confirmed.toLocaleString()} 명`,
    }
  })
  return result
}
