import styles from './route.module.scss'
import { Routes, Route } from 'react-router-dom'

import SideBar from './_Component/SideBar'
import MainPage from './MainPage'
import KoreaPage from './KoreaPage'
import JapanPage from './JapanPage'

const App = () => {
  return (
    <div className={styles.appContainer}>
      <SideBar />
      <main className={styles.contentContainer}>
        <Routes>
          <Route path='' element={<MainPage />} />
          <Route path='/korea' element={<KoreaPage />} />
          <Route path='/japan' element={<JapanPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
