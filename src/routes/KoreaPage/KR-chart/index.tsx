import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory'

import { useMount } from 'hooks'

import { fetchKrData, getMonthNameArray, getMonthFinalData } from 'services/covid'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { krCovidInfoArray, monthNameArray } from 'states/covid'
import { CovidType, CovidChartType } from 'types/covid'

import Spinner from 'routes/_Component/Spinner'

const KoreaChart = () => {
  const [krCovidData, setKrCovidData] = useRecoilState(krCovidInfoArray)
  const [monthName, setMonthName] = useRecoilState(monthNameArray)

  useMount(() => setMonthName(getMonthNameArray()))

  const { isLoading, isFetching } = useQuery('kr-covid', fetchKrData, {
    staleTime: Infinity,
    onSuccess: (data) => setKrCovidData(data),
  })

  const makeObjectWithTwoArray = () => {
    const dataArray = getMonthFinalData(krCovidData)
    const monthArray = monthName

    const result = dataArray.map((item: any) => {
      const monthNumber = item.Date.split('-')[1]
      const Month = monthArray[monthNumber - 1]
      return {
        Month,
        Active: item.Active,
      }
    })
    return result
  }

  if (isLoading) return <Spinner />
  if (isFetching) return <Spinner />

  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={20} width={500}>
      <VictoryAxis tickValues={monthName} tickFormat={monthName} />
      <VictoryAxis dependentAxis tickFormat={(x) => `${(x / 10000).toLocaleString()}만`} />
      <VictoryBar data={makeObjectWithTwoArray()} x='Month' y='Active' />
    </VictoryChart>
  )
}

export default KoreaChart
