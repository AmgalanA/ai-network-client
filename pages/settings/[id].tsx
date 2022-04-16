import Header from '../../components/MainPart/Header'
import Settings from '../../components/MainPart/Settings/Settings'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-1 flex-col`,
}

const settings = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentContainer}>
        <Header />
        <Settings />
      </div>
    </div>
  )
}

export default settings
