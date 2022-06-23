import styles from './route.module.scss'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Routes>
        <Route path='' element={<>FIRST</>} />
      </Routes>
    </div>
  )
}

export default App
