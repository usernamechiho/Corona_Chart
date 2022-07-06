import { VictoryChart, VictoryGroup, VictoryBar, VictoryTheme } from 'victory'

import { useQueries } from 'react-query'

import { useMount } from 'hooks'
import { useRecoilState } from 'recoil'
import { krCovidInfoArray, jpCovidInfoArray, monthNameArray } from 'states/covid'

import { fetchKrData, fetchJpData, getMonthNameArray, getMonthFinalData } from 'services/covid'

import Spinner from 'routes/_Component/Spinner'

const KoreaJapanComparedChart = () => {
  const [krCovidArray, setKrCovidArray] = useRecoilState(krCovidInfoArray)
  const [jpCovidArray, setJpCovidArray] = useRecoilState(jpCovidInfoArray)
  const [monthName, setMonthName] = useRecoilState(monthNameArray)

  useMount(() => setMonthName(getMonthNameArray()))

  console.log(monthName)

  const results = useQueries([
    {
      queryKey: 'kr-covid',
      queryFn: fetchKrData,
      staleTime: 1000 * 60 * 60 * 24,
      onSuccess: (data: any) => setKrCovidArray(data),
    },
    {
      queryKey: 'jp-covid',
      queryFn: fetchJpData,
      staleTime: 1000 * 60 * 60 * 24,
      onSuccess: (data: any) => setJpCovidArray(data),
    },
  ])

  const activeStatsObject = (covidArray: any[]) => {
    const dataArray = getMonthFinalData(covidArray)
    const monthArray = monthName

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

  if (results[0].status === 'loading') return <Spinner />
  if (results[1].status === 'loading') return <Spinner />

  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={40} width={700} height={300}>
      <VictoryGroup offset={40} colorScale='qualitative'>
        <VictoryBar data={activeStatsObject(krCovidArray)} x='Month' y='Confirmed' />
        <VictoryBar data={activeStatsObject(jpCovidArray)} x='Month' y='Confirmed' />
      </VictoryGroup>
    </VictoryChart>
  )
}

export default KoreaJapanComparedChart
