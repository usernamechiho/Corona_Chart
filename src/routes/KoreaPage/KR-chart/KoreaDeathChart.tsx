import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { krCovidInfoArray, monthNameArray } from 'states/covid'
import { fetchKrData, getMonthNameArray, getMonthFinalData } from 'services/covid'

import { useMount } from 'hooks'

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory'

import Spinner from 'routes/_Component/Spinner'

const KoreaDeathChart = () => {
  const [krCovidData, setKrCovidData] = useRecoilState(krCovidInfoArray)
  const [monthName, setMonthName] = useRecoilState(monthNameArray)

  useMount(() => setMonthName(getMonthNameArray()))

  const { isLoading } = useQuery('kr-covid', fetchKrData, {
    staleTime: Infinity,
    onSuccess: (data) => setKrCovidData(data),
  })

  const deathStatsObject = () => {
    const dataArray = getMonthFinalData(krCovidData)
    const monthArray = monthName

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

  if (isLoading) return <Spinner />

  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={20} width={500}>
      <VictoryAxis
        style={{
          grid: { stroke: '#90A4AE', strokeWidth: 0.5 },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => `${(x / 10000).toLocaleString()}만`}
        style={{
          grid: { stroke: '#90A4AE', strokeWidth: 0.5 },
        }}
      />
      <VictoryBar
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        data={deathStatsObject()}
        style={{ data: { fill: '#ff6347' } }}
        x='Month'
        y='Death'
        labelComponent={<VictoryTooltip />}
      />
    </VictoryChart>
  )
}

export default KoreaDeathChart
