import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useTypedSelector } from '../app/hooks'
import { wrapper } from '../app/store'
import MasonryLayout from '../components/Layouts/MasonryLayout'
import Header from '../components/MainPart/Header'
import Sidebar from '../components/MainPart/Sidebar'
import { setPosts } from '../slices/posts/postsSlice'
import { IPost } from '../types/post/IPost'

const styles = {
  wrapper: `grid grid-cols-4`,
  contentContainer: `flex w-full  col-span-3 flex-col items-center`,
}

interface IProp {
  serverPosts: IPost[]
}

const search = ({ serverPosts }: IProp) => {
  const [posts, setPosts] = useState<IPost[]>([])

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
      </div>
    </div>
  )
}

export default search

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const response = await axios.get<IPost[]>(
      `${process.env.BASE_URL}/post/get-all`
    )

    store.dispatch(setPosts(response.data))

    return {
      props: {
        serverPosts: response.data,
      },
    }
  })
