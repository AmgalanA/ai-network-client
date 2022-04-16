import Header from '../../components/MainPart/Header'
import CreatePostModal from '../../components/MainPart/Modals/CreatePostModal'
import Sidebar from '../../components/MainPart/Sidebar'
const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}
const create = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <CreatePostModal />
      </div>
    </div>
  )
}

export default create
