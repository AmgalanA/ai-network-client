import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { wrapper } from '../app/store'
import Header from '../components/MainPart/Header'
import Albums from '../components/MainPart/Music/Albums/Albums'
import Sidebar from '../components/MainPart/Sidebar'
import { setAlbums } from '../slices/albums/albumsSlice'
import { IAlbum } from '../types/album/IAlbum'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}
const albums = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <Albums />
      </div>
    </div>
  )
}

export default albums

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    const response = await axios.get<IAlbum[]>(
      `${process.env.BASE_URL}/album/get-all?limit=20`
    )
    store.dispatch(setAlbums(response.data))

    return {
      props: {},
    }
  })
