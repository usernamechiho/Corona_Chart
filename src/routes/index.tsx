import styles from './route.module.scss'
import { Routes, Route } from 'react-router-dom'

import SideBar from './_Component/SideBar'
import MainPage from './MainPage'
import KoreaPage from './KoreaPage'
import JapanPage from './JapanPage'
import JapanAndKoreaContainer from './JapanAndKoreaContainer'

const App = () => {
  return (
    <div className={styles.appContainer}>
      <SideBar />
      <main className={styles.contentContainer}>
        <Routes>
          <Route element={<JapanAndKoreaContainer />}>
            <Route path='/korea' element={<KoreaPage />} />
            <Route path='/japan' element={<JapanPage />} />
          </Route>
          <Route path='' element={<MainPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
