import Header from '../../components/MainPart/Header'
import CreateAlbumModal from '../../components/MainPart/Modals/CreateAlbumModal'
import Sidebar from '../../components/MainPart/Sidebar'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}
const createAlbum = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <CreateAlbumModal />
      </div>
    </div>
  )
}

export default createAlbum
