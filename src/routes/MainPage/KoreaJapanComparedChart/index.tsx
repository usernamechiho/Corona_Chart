import { VictoryChart, VictoryGroup, VictoryBar, VictoryTheme, VictoryAxis, VictoryTooltip } from 'victory'

import { useQueries } from 'react-query'

import { useMount } from 'hooks'
import { useRecoilState } from 'recoil'
import { krCovidInfoArray, jpCovidInfoArray, monthNameArray } from 'states/covid'
import { CovidType } from 'types/covid'

import { fetchKrData, fetchJpData, getMonthNameArray, activeStatsObject } from 'services/covid'

import Spinner from 'routes/_Component/Spinner'

const KoreaJapanComparedChart = () => {
  const [krCovidArray, setKrCovidArray] = useRecoilState(krCovidInfoArray)
  const [jpCovidArray, setJpCovidArray] = useRecoilState(jpCovidInfoArray)
  const [monthName, setMonthName] = useRecoilState(monthNameArray)

  useMount(() => setMonthName(getMonthNameArray()))

  const results = useQueries([
    {
      queryKey: 'kr-covid',
      queryFn: fetchKrData,
      staleTime: 1000 * 60 * 60 * 24,
      onSuccess: (data: CovidType[]) => setKrCovidArray(data),
    },
    {
      queryKey: 'jp-covid',
      queryFn: fetchJpData,
      staleTime: 1000 * 60 * 60 * 24,
      onSuccess: (data: CovidType[]) => setJpCovidArray(data),
    },
  ])

  if (results[0].status === 'loading') return <Spinner />
  if (results[1].status === 'loading') return <Spinner />

  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={40} width={700} height={400}>
      <VictoryGroup offset={30} colorScale='qualitative'>
        <VictoryBar
          data={activeStatsObject(krCovidArray, monthName)}
          x='Month'
          y='Confirmed'
          labelComponent={<VictoryTooltip />}
        />
        <VictoryBar
          data={activeStatsObject(jpCovidArray, monthName)}
          x='Month'
          y='Confirmed'
          labelComponent={<VictoryTooltip />}
        />
      </VictoryGroup>
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
        tickFormat={(x) => `${(x / 1000000).toLocaleString()}M`}
      />
    </VictoryChart>
  )
}

export default KoreaJapanComparedChart
