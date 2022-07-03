import styles from './sideBarItem.module.scss'

import { cx } from 'styles'
import { NavLink } from 'react-router-dom'
import { WorldwideIcon, KoreaIcon, JapanIcon } from 'assets/svgs'

const NAV_ITEM = [
  {
    id: 1,
    href: '/',
    text: 'Home',
    icon: <WorldwideIcon className={styles.worldwideIcon} />,
  },
  {
    id: 2,
    href: 'korea',
    text: 'Korea',
    icon: <KoreaIcon className={styles.koreaIcon} />,
  },
  {
    id: 3,
    href: 'japan',
    text: 'Japan',
    icon: <JapanIcon className={styles.japanIcon} />,
  },
]

const SideBarItem = () => {
  const SideBarList: JSX.Element[] = NAV_ITEM.map((item) => (
    <li key={item.text} className={styles.sideBarListTag}>
      <NavLink to={item.href} className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
        {item.icon}
        <span className={styles.iconText}>{item.text}</span>
      </NavLink>
    </li>
  ))

  return (
    <nav className={styles.sideBarNav}>
      <ul>{SideBarList}</ul>
    </nav>
  )
}

export default SideBarItem
