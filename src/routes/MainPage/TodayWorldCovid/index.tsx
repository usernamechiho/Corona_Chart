import styles from './todayWorldCovid.module.scss'
import { fetchWorldwideData } from 'services/covid'

import { useRecoilState } from 'recoil'
import { worldTodayInfoObj } from 'states/covid'
import { useQuery } from 'react-query'

import Spinner from 'routes/_Component/Spinner'

const TodayWorldCovid = () => {
  const [todayWorldData, setTodayWorldData] = useRecoilState(worldTodayInfoObj)

  const { isLoading } = useQuery('covid-worldwide', fetchWorldwideData, {
    staleTime: 1000 * 60 * 60 * 24,
    onSuccess: (data) => setTodayWorldData(data.Global),
  })

  if (isLoading) return <Spinner />

  const { Date, NewConfirmed, NewDeaths, TotalConfirmed, TotalDeaths } = todayWorldData
  const standardDate = Date.split('T')[0]
  const standardTime = Date.split('T')[1].slice(0, 2)

  return (
    <main className={styles.gridContainer}>
      <header className={styles.gridHeader}>
        <span className={styles.headerDateHighlight}>
          {standardDate}일, {standardTime}시 기준
        </span>
        , 세계 COVID19 상황
      </header>
      <section className={styles.newConfirmed}>
        <div className={styles.sectionCardHeader}>Newly Confirmed Figure</div>
        {NewConfirmed.toLocaleString()}명
      </section>
      <section className={styles.newDeath}>
        <div className={styles.sectionCardHeader}>New Deaths Figure</div>
        {NewDeaths.toLocaleString()}명
      </section>
      <section className={styles.totalConfirmed}>
        <div className={styles.sectionCardHeader}>Total Confirmed Figure</div>
        {TotalConfirmed.toLocaleString()}명
      </section>
      <section className={styles.totalDeath}>
        <div className={styles.sectionCardHeader}>Total Deaths Figure</div>
        {TotalDeaths.toLocaleString()}명
      </section>
    </main>
  )
}

export default TodayWorldCovid
