import styles from './comparisonResult.module.scss'

import AnimatedNumbers from 'react-animated-numbers'

interface Props {
  resultArray: (number | string)[] | any
}

const ComparisonResult = ({ resultArray }: Props) => {
  return (
    <section className={styles.comparisonResultContainer}>
      <main className={styles.numberContainer}>
        +
        <AnimatedNumbers
          includeComma
          animateToNumber={resultArray[1]}
          configs={[
            { mass: 1, tension: 130, friction: 40 },
            { mass: 2, tension: 140, friction: 40 },
            { mass: 3, tension: 130, friction: 40 },
          ]}
        />
      </main>
      <p className={styles.resultDesc}>{resultArray[0]} 기준, 전일 대비 확진자 증가 수</p>
    </section>
  )
}

export default ComparisonResult
