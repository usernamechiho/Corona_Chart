import styles from './japanAndKoreaContainer.module.scss'

import { Outlet } from 'react-router-dom'

const JapanAndKoreaContainer = () => {
  return (
    <div className={styles.componentContainer}>
      <main className={styles.contentContainer}>
        <Outlet />
      </main>
    </div>
  )
}

export default JapanAndKoreaContainer
