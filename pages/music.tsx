import axios from 'axios'
import { GetServerSideProps } from 'next'
import { wrapper } from '../app/store'
import Header from '../components/MainPart/Header'
import Songs from '../components/MainPart/Music/Songs/Songs'
import Sidebar from '../components/MainPart/Sidebar'
import { setSongs } from '../slices/music/musicSlice'
import { ISong } from '../types/music/ISong'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}

const music = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <Songs />
      </div>
    </div>
  )
}

export default music

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    const response = await axios.get<ISong[]>(
      `${process.env.BASE_URL}/music/get-all?limit=20`
    )

    store.dispatch(setSongs(response.data))

    return {
      props: {},
    }
  })
