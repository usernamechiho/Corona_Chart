import styles from './koreaPage.module.scss'

import { useRecoilState } from 'recoil'
import { krCovidInfoArray } from 'states/covid'

import { StatisticIcon } from 'assets/svgs'
import Divider from 'routes/_Component/Divider'
import KoreaConfirmedChart from './KR-chart/KoreaConfirmedChart'
import KoreaDeathChart from './KR-chart/KoreaDeathChart'
import ComparisonResult from 'routes/_Component/ComparisonResult'

import Spinner from 'routes/_Component/Spinner'

const KoreaPage = () => {
  const [krCovidData] = useRecoilState(krCovidInfoArray)

  const confirmedNumberComparedToYesterday = () => {
    if (krCovidData.length) {
      const getLastTwoData = krCovidData.slice(-2)
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
        <h1>COVID19, Korea</h1>
      </header>
      <Divider />
      <main className={styles.contentContainer}>
        <section>
          <h1>최근 6개월 확진 통계</h1>
          <KoreaConfirmedChart />
        </section>
        <section>
          <h1>최근 6개월 사망자 통계</h1>
          <KoreaDeathChart />
        </section>
        {krCovidData && <ComparisonResult resultArray={confirmedNumberForToday} />}
      </main>
    </div>
  )
}

export default KoreaPage
