import styles from './mainPage.module.scss'
import { ResponsiveChoropleth } from '@nivo/geo'

import { useQuery } from 'react-query'
import { fetchWorldwideData } from 'services/covid'
import { useRecoilState } from 'recoil'
import { worldWideInfoArray } from 'states/covid'

import feature from 'assets/jsons/feature.json'
import Spinner from 'routes/_Component/Spinner'
import KoreaJapanComparedChart from './KoreaJapanComparedChart'
import TodayWorldCovid from './TodayWorldCovid'

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
    <div className={styles.contentContainer}>
      <header className={styles.pageHeader}>
        <h1>OUR GLOBAL PRESENCE</h1>
        <p>COVID19 Figures for Every Nation</p>
      </header>
      <main className={styles.mainContainer}>
        <section className={styles.worldMap}>
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
            borderWidth={0.5}
            borderColor='#152538'
            legends={[
              {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                itemsSpacing: 10,
                itemWidth: 100,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: '#ffffff',
                symbolSize: 25,
              },
            ]}
          />
        </section>
        <aside>
          <TodayWorldCovid />
        </aside>
        <section className={styles.koreaJapanComparisonContainer}>
          <div className={styles.comparisonHeader}>한국 일본 확진자 추이 비교 차트</div>
          <main className={styles.chartBarDesc}>
            <div className={styles.krBar} /> Korea
            <div className={styles.jpBar} /> Japan
          </main>
          <KoreaJapanComparedChart />
        </section>
      </main>
    </div>
  )
}

export default MainPage
