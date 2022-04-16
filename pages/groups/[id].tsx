import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useTypedSelector } from '../../app/hooks'
import { wrapper } from '../../app/store'
import Groups from '../../components/MainPart/Groups/Groups'
import Header from '../../components/MainPart/Header'
import Sidebar from '../../components/MainPart/Sidebar'
import { setGroups } from '../../slices/groups/groupsSlice'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}

const groups = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <Groups />
      </div>
    </div>
  )
}

export default groups

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/group/get-all`
    )
    store.dispatch(setGroups(response.data))

    return {
      props: {},
    }
  })
