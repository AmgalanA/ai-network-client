import axios from 'axios'
import { GetServerSideProps } from 'next'
import { wrapper } from '../../app/store'
import MasonryLayout from '../../components/Layouts/MasonryLayout'
import Feed from '../../components/MainPart/Feed'
import Header from '../../components/MainPart/Header'
import Sidebar from '../../components/MainPart/Sidebar'
import UserProfile from '../../components/Profile/UserProfile'
import { IPost } from '../../types/post/IPost'
import { IProfile } from '../../types/profile/IProfile'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}

interface IProp {
  showingProfile: IProfile
  posts: IPost[]
}

const profile = ({ showingProfile, posts }: IProp) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <UserProfile showingProfile={showingProfile} />
        <MasonryLayout posts={posts} />
      </div>
    </div>
  )
}

export default profile

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    const response = await axios.get<IProfile>(
      `${process.env.BASE_URL}/profile/get-by-id/${params?.id?.toString()}`
    )

    const postResponse = await axios.get<IPost[]>(
      `${
        process.env.BASE_URL
      }/post/get-specific-posts/${params?.id?.toString()}`
    )

    return {
      props: {
        showingProfile: response.data,
        posts: postResponse.data,
      },
    }
  })
