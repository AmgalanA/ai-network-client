import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'
import { wrapper } from '../../app/store'
import Header from '../../components/MainPart/Header'
import Album from '../../components/MainPart/Music/Albums/Album'
import AlbumScreen from '../../components/MainPart/Music/Albums/AlbumScreen'
import Sidebar from '../../components/MainPart/Sidebar'
import { IAlbum } from '../../types/album/IAlbum'
const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}

interface IProp {
  album: IAlbum
}

const album = ({ album }: IProp) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <AlbumScreen album={album} />
      </div>
    </div>
  )
}

export default album

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    const response = await axios.get<IAlbum>(
      `${process.env.BASE_URL}/album/get-one/${params?.id}`
    )

    return {
      props: {
        album: response.data,
      },
    }
  })
