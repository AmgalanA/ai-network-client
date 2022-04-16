import Header from '../../components/MainPart/Header'
import CreateSongModal from '../../components/MainPart/Modals/CreateSongModal'
import Sidebar from '../../components/MainPart/Sidebar'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}

const createSong = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <CreateSongModal />
      </div>
    </div>
  )
}

export default createSong
