import styles from './spinner.module.scss'
import { Oval } from 'react-loader-spinner'

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <Oval
        ariaLabel='loading-indicator'
        height={50}
        width={50}
        strokeWidth={5}
        color='#192841'
        secondaryColor='white'
      />
    </div>
  )
}

export default Spinner
