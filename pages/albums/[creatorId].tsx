import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'
import { wrapper } from '../../app/store'
import Header from '../../components/MainPart/Header'
import Albums from '../../components/MainPart/Music/Albums/Albums'
import Sidebar from '../../components/MainPart/Sidebar'
import { setAlbums } from '../../slices/albums/albumsSlice'
import { IAlbum } from '../../types/album/IAlbum'
const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}
const createdAlbums = () => {
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

export default createdAlbums

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    const response = await axios.get<IAlbum[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/album/get-albums-created/${params?.creatorId}`
    )

    store.dispatch(setAlbums(response.data))

    return {
      props: {},
    }
  })
