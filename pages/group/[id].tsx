import axios from 'axios'
import { GetServerSideProps } from 'next'
import { wrapper } from '../../app/store'
import GroupScreen from '../../components/MainPart/Groups/GroupScreen'
import Header from '../../components/MainPart/Header'
import Sidebar from '../../components/MainPart/Sidebar'
import { IGroup } from '../../types/groups/IGroup'
import { IPost } from '../../types/post/IPost'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}

interface IProp {
  group: IGroup
}

const group = ({ group }: IProp) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <GroupScreen group={group} />
      </div>
    </div>
  )
}

export default group

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/group/get-one/${params?.id}`
    )

    return {
      props: {
        group: response.data,
      },
    }
  })
