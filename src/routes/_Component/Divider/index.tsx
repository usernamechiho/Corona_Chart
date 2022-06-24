import styles from './divider.module.scss'

import { DiceIcon } from 'assets/svgs'

const Divider = () => {
  return (
    <div className={styles.dividerContainer}>
      <DiceIcon className={styles.dividerDiceIcon} />
      <div className={styles.divider} />
    </div>
  )
}

export default Divider
