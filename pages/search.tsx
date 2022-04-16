import axios from 'axios'
import { GetServerSideProps } from 'next'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useTypedSelector } from '../app/hooks'
import { wrapper } from '../app/store'
import MasonryLayout from '../components/Layouts/MasonryLayout'
import Header from '../components/MainPart/Header'
import Sidebar from '../components/MainPart/Sidebar'
import Profiles from '../components/Profile/Profiles'
import { setPosts } from '../slices/posts/postsSlice'
import { IPost } from '../types/post/IPost'
import { IProfile } from '../types/profile/IProfile'

const styles = {
  wrapper: `grid grid-cols-4`,
  contentContainer: `flex w-full  col-span-3 flex-col items-center`,
}

interface IProp {
  serverPosts: IPost[]
}

interface IState {
  data: IPost[] | IProfile[]
}

const search = ({ serverPosts }: IProp) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<IPost[]>([])
  const [profiles, setProfiles] = useState<IProfile[]>([])

  const searchQuery = useTypedSelector(
    (store) => store.searchReducer.searchQuery
  )

  useEffect(() => {
    const searchPosts = async () => {
      if (searchQuery) {
        setLoading(true)

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/post/search?query=${searchQuery}`
        )
        setPosts(response.data)

        setLoading(false)
      }
    }

    const searchProfiles = async () => {
      if (searchQuery) {
        setLoading(true)

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/search?query=${searchQuery}`
        )
        setProfiles(response.data)

        setLoading(false)
      }
    }

    if (Object.keys(router.query)[0].includes('posts')) {
      searchPosts()
    } else if (Object.keys(router.query)[0].includes('profiles')) {
      searchProfiles()
    }
  }, [searchQuery])

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        {Object.keys(router.query)[0].includes('post') ? (
          <MasonryLayout posts={posts} />
        ) : (
          Object.keys(router.query)[0].includes('profiles') && (
            <Profiles profiles={profiles} />
          )
        )}
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
