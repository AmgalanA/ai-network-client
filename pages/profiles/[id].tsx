import Sidebar from '../../components/MainPart/Sidebar'
import Header from '../../components/MainPart/Header'
import { wrapper } from '../../app/store'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { IProfile } from '../../types/profile/IProfile'
import Profiles from '../../components/Profile/Profiles'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}

interface IProp {
  profiles: IProfile[]
}

const profiles = ({ profiles }: IProp) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <Profiles profiles={profiles} />
      </div>
    </div>
  )
}

export default profiles

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    const response = await axios.get<IProfile[]>(
      `${process.env.BASE_URL}/profile/get-all`
    )
    const filteredProfiles = response.data.filter(
      (profile) => profile.id.toString() !== params?.id
    )

    return {
      props: {
        profiles: filteredProfiles,
      },
    }
  })
