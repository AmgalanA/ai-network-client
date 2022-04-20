import axios from 'axios'
import { GetServerSideProps } from 'next'
import { wrapper } from '../../../app/store'
import Header from '../../../components/MainPart/Header'
import SongScreen from '../../../components/MainPart/Music/Songs/SongScreen'
import Sidebar from '../../../components/MainPart/Sidebar'
import { ISong } from '../../../types/music/ISong'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}

interface IProp {
  song: ISong
  artistSongs: ISong[]
}

const songScreen = ({ song, artistSongs }: IProp) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <SongScreen artistSongs={artistSongs} song={song} />
      </div>
    </div>
  )
}

export default songScreen

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    const response = await axios.get<ISong>(
      `${process.env.BASE_URL}/music/get-one/${params?.id}`
    )

    const artistSongsResponse = await axios.get<ISong[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/music/get-artist-songs/${response.data.artist}`
    )
    const filteredArtistSongs = artistSongsResponse.data.filter(
      (song) => song.id !== response.data.id
    )

    return {
      props: {
        song: response.data,
        artistSongs: filteredArtistSongs,
      },
    }
  })
