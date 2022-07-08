import styles from './japanPage.module.scss'

import { useRecoilState } from 'recoil'
import { jpCovidInfoArray } from 'states/covid'
import { confirmedNumberComparedToYesterday } from 'services/covid'

import JapanDeathChart from './JP-chart/JapanDeathChart'
import JapanConfirmedChart from './JP-chart/JapanConfirmedChart'
import ComparisonResult from 'routes/_Component/ComparisonResult'
import { StatisticIcon } from 'assets/svgs'
import Divider from 'routes/_Component/Divider'

const JapanPage = () => {
  const [jpCovidData] = useRecoilState(jpCovidInfoArray)

  return (
    <div className={styles.koreaPageContainer}>
      <header className={styles.headerContainer}>
        <StatisticIcon />
        <h1>COVID19, Japan</h1>
      </header>
      <Divider />
      <main className={styles.contentContainer}>
        <section>
          <h1>최근 6개월 확진 통계</h1>
          <JapanConfirmedChart />
        </section>
        <section>
          <h1>최근 6개월 사망자 통계</h1>
          <JapanDeathChart />
        </section>
        {jpCovidData && <ComparisonResult resultArray={confirmedNumberComparedToYesterday(jpCovidData)} />}
      </main>
    </div>
  )
}

export default JapanPage
