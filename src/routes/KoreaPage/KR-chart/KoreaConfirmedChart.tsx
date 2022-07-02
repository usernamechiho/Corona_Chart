import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip, LineSegment } from 'victory'

import { useMount } from 'hooks'

import { fetchKrData, getMonthNameArray, getMonthFinalData } from 'services/covid'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { krCovidInfoArray, monthNameArray } from 'states/covid'

import Spinner from 'routes/_Component/Spinner'

const KoreaConfirmedChart = () => {
  const [krCovidData, setKrCovidData] = useRecoilState(krCovidInfoArray)
  const [monthName, setMonthName] = useRecoilState(monthNameArray)

  useMount(() => setMonthName(getMonthNameArray()))

  const { isLoading, isFetching } = useQuery('kr-covid', fetchKrData, {
    staleTime: Infinity,
    onSuccess: (data) => setKrCovidData(data),
  })

  const activeStatsObject = () => {
    const dataArray = getMonthFinalData(krCovidData)
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

  if (isLoading) return <Spinner />
  if (isFetching) return <Spinner />

  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={20} width={500}>
      <VictoryAxis
        style={{
          grid: { stroke: '#90A4AE', strokeWidth: 0.5 },
        }}
      />
      <VictoryAxis
        style={{
          grid: { stroke: '#90A4AE', strokeWidth: 0.5 },
        }}
        dependentAxis
        tickFormat={(x) => `${(x / 10000).toLocaleString()}만`}
      />
      <VictoryBar
        style={{ data: { fill: '#3792cb' } }}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        data={activeStatsObject()}
        x='Month'
        y='Confirmed'
        labelComponent={<VictoryTooltip />}
      />
    </VictoryChart>
  )
}

export default KoreaConfirmedChart
