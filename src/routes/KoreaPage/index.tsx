import styles from './koreaPage.module.scss'

import { StatisticIcon } from 'assets/svgs'
import Divider from 'routes/_Component/Divider'
import KoreaChart from './KR-chart'

const KoreaPage = () => {
  return (
    <div className={styles.koreaPageContainer}>
      <header className={styles.headerContainer}>
        <StatisticIcon />
        <h1>COVID19, Korea</h1>
      </header>
      <Divider />
      <nav className={styles.datePickerNav}>DATE PICKER</nav>
      <main className={styles.contentContainer}>
        <section>
          <KoreaChart />
        </section>
        <section>
          <KoreaChart />
        </section>
        <article>ABOUT KOREA</article>
      </main>
    </div>
  )
}

export default KoreaPage
