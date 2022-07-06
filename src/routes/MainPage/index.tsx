import { ResponsiveChoropleth } from '@nivo/geo'

import { useQuery } from 'react-query'
import { fetchWorldwideData } from 'services/covid'
import { useRecoilState } from 'recoil'
import { worldWideInfoArray } from 'states/covid'

import feature from 'assets/jsons/feature.json'
import Spinner from 'routes/_Component/Spinner'
import KoreaJapanComparedChart from './KoreaJapanComparedChart'

const MainPage = () => {
  const [worldwideData, setWorldwideData] = useRecoilState(worldWideInfoArray)

  const { isLoading } = useQuery('worldwide-covid', fetchWorldwideData, {
    staleTime: 1000 * 60 * 60 * 24,
    onSuccess: (data) => setWorldwideData(data.Countries),
  })

  const changeWorldwideDataArrayFormat = (worldArray: any[]) => {
    return worldArray.map((data) => ({
      id: data.CountryCode,
      value: data.TotalConfirmed,
    }))
  }

  if (isLoading) return <Spinner />

  return (
    <div>
      <header>
        <h1>OUR GLOBAL PRESENSE</h1>
        <p>COVID19 Figures for Every Nation</p>
      </header>
      <section style={{ width: '1000px', height: '500px' }}>
        <ResponsiveChoropleth
          data={changeWorldwideDataArrayFormat(worldwideData)}
          features={feature.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors='oranges'
          domain={[0, 10000000]}
          unknownColor='#666666'
          label='properties.name'
          valueFormat='.2s'
          projectionTranslation={[0.5, 0.5]}
          projectionRotation={[0, 0, 0]}
          enableGraticule
          graticuleLineColor='#dddddd'
          borderWidth={0.5}
          borderColor='#152538'
          legends={[
            {
              anchor: 'bottom-left',
              direction: 'column',
              justify: true,
              translateX: 20,
              translateY: -100,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: 'left-to-right',
              itemTextColor: '#444444',
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000000',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
        <KoreaJapanComparedChart />
      </section>
    </div>
  )
}

export default MainPage
