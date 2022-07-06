import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { jpCovidInfoArray, monthNameArray } from 'states/covid'
import { fetchJpData, getMonthNameArray, getMonthFinalData } from 'services/covid'

import { useMount } from 'hooks'

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory'

import Spinner from 'routes/_Component/Spinner'

const JapanConfirmedChart = () => {
  const [jpCovidData, setJpCovidData] = useRecoilState(jpCovidInfoArray)
  const [monthName, setMonthName] = useRecoilState(monthNameArray)

  useMount(() => setMonthName(getMonthNameArray()))

  const { isLoading } = useQuery('jp-covid', fetchJpData, {
    staleTime: 1000 * 60 * 60 * 24,
    onSuccess: (data) => setJpCovidData(data),
  })

  const activeStatsObject = () => {
    const dataArray = getMonthFinalData(jpCovidData)
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

  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={20} width={500}>
      <VictoryBar
        style={{ data: { fill: '#927766' } }}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        data={activeStatsObject()}
        x='Month'
        y='Confirmed'
        labelComponent={<VictoryTooltip />}
      />
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
    </VictoryChart>
  )
}

export default JapanConfirmedChart
