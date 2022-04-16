import Header from '../../components/MainPart/Header'
import CreateGroupModal from '../../components/MainPart/Modals/CreateGroupModal'
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
        <CreateGroupModal />
      </div>
    </div>
  )
}

export default create
