import styles from './route.module.scss'
import { Routes, Route } from 'react-router-dom'

import SideBar from './_Component/SideBar'

const App = () => {
  return (
    <div className={styles.appContainer}>
      <SideBar />
      <Routes>
        <Route path='' element={<div />} />
      </Routes>
    </div>
  )
}

export default App
