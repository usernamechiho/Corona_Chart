import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { krCovidInfoArray, monthNameArray } from 'states/covid'
import { fetchKrData, getMonthNameArray, deathStatsObject } from 'services/covid'

import { useMount } from 'hooks'

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory'

import Spinner from 'routes/_Component/Spinner'

const KoreaDeathChart = () => {
  const [krCovidData, setKrCovidData] = useRecoilState(krCovidInfoArray)
  const [monthName, setMonthName] = useRecoilState(monthNameArray)

  useMount(() => setMonthName(getMonthNameArray()))

  const { isLoading } = useQuery('kr-covid', fetchKrData, {
    staleTime: 1000 * 60 * 60 * 24,
    onSuccess: (data) => setKrCovidData(data),
  })

  if (isLoading) return <Spinner />

  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={20} width={500}>
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
        data={deathStatsObject(krCovidData, monthName)}
        style={{ data: { fill: '#c43a31' } }}
        x='Month'
        y='Death'
        labelComponent={<VictoryTooltip />}
      />
      <VictoryAxis
        style={{
          grid: { stroke: '#90A4AE', strokeWidth: 0.5 },
        }}
      />
    </VictoryChart>
  )
}

export default KoreaDeathChart
