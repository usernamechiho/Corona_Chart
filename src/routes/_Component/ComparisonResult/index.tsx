import styles from './comparisonResult.module.scss'

import AnimatedNumbers from 'react-animated-numbers'

interface Props {
  resultArray: (number | string)[] | any
}

const ComparisonResult = ({ resultArray }: Props) => {
  return (
    <section>
      <h1 className={styles.header}>
        {resultArray[0]} 기준, 어제와 대비 확진자 수가
        <div className={styles.numberContainer}>
          <AnimatedNumbers
            includeComma
            animateToNumber={resultArray[1]}
            fontStyle={{ fontSize: 50 }}
            configs={[
              { mass: 1, tension: 130, friction: 40 },
              { mass: 2, tension: 140, friction: 40 },
              { mass: 3, tension: 130, friction: 40 },
            ]}
          />
        </div>
        만큼 증가했습니다.
      </h1>
    </section>
  )
}

export default ComparisonResult
