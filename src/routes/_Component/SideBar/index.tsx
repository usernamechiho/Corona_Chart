import styles from './sideBar.module.scss'

import { useState, useRef, useClickAway } from 'hooks'
import { cx } from 'styles'

import { HamburgerIcon, DiceIcon } from 'assets/svgs'
import SideBarItem from './SideBarItem'

const SideBar = () => {
  const [isSideBarShow, setIsSideBarShow] = useState(false)

  const sideBarRef = useRef(null)

  const handleSideBar = () => setIsSideBarShow((prev) => !prev)

  const handleCloseSideBar = () => isSideBarShow && setIsSideBarShow(false)

  useClickAway(sideBarRef, handleCloseSideBar)

  return (
    <>
      <aside ref={sideBarRef} className={cx(styles.sideBarContainer, { [styles.showSideBar]: isSideBarShow })}>
        <DiceIcon className={styles.diceIcon} />
        <SideBarItem />
      </aside>
      <button type='button' className={styles.hamburgerIconButton} onClick={handleSideBar}>
        <HamburgerIcon />
      </button>
    </>
  )
}

export default SideBar
