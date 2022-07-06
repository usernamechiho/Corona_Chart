import styles from './japanPage.module.scss'

import { useRecoilState } from 'recoil'
import { jpCovidInfoArray } from 'states/covid'

import JapanDeathChart from './JP-chart/JapanDeathChart'
import JapanConfirmedChart from './JP-chart/JapanConfirmedChart'
import ComparisonResult from 'routes/_Component/ComparisonResult'
import { StatisticIcon } from 'assets/svgs'
import Divider from 'routes/_Component/Divider'
import Spinner from 'routes/_Component/Spinner'

const JapanPage = () => {
  const [jpCovidData] = useRecoilState(jpCovidInfoArray)

  const confirmedNumberComparedToYesterday = () => {
    if (jpCovidData.length) {
      const getLastTwoData = jpCovidData.slice(-2)
      const confirmedValueCalculation = getLastTwoData[1].Active - getLastTwoData[0].Active
      return [getLastTwoData[1].Date.split('T')[0], confirmedValueCalculation]
    }

    return <Spinner />
  }

  const confirmedNumberForToday: (string | number)[] | any = confirmedNumberComparedToYesterday()

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
        {jpCovidData && <ComparisonResult resultArray={confirmedNumberForToday} />}
      </main>
    </div>
  )
}

export default JapanPage
