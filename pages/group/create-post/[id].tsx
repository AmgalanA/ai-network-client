import axios from 'axios'
import { GetServerSideProps } from 'next'
import { wrapper } from '../../../app/store'
import Header from '../../../components/MainPart/Header'
import CreatePostModal from '../../../components/MainPart/Modals/CreatePostModal'
import Sidebar from '../../../components/MainPart/Sidebar'
import { IGroup } from '../../../types/groups/IGroup'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}

interface IProp {
  group: IGroup
}

const createPost = ({ group }: IProp) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <CreatePostModal group={group} />
      </div>
    </div>
  )
}

export default createPost

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/group/get-one/${query?.id}`
    )

    return {
      props: {
        group: response.data,
      },
    }
  })
