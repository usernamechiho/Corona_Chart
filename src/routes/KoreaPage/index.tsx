import styles from './koreaPage.module.scss'

import { StatisticIcon } from 'assets/svgs'
import Divider from 'routes/_Component/Divider'

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
        <section>chart 1</section>
        <section>chart 2</section>
        <article>ABOUT KOREA</article>
      </main>
    </div>
  )
}

export default KoreaPage
