import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { wrapper } from '../app/store'
import MainPart from '../containers/MainPart'
import { selectPosts, setPosts } from '../slices/posts/postsSlice'
import { IPost } from '../types/post/IPost'

const Home: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
  }, [])

  return (
    <div className="w-screen">
      <Head>
        <title>Ai Network</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainPart />
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const response = await axios.get<IPost[]>(
      `${process.env.BASE_URL}/post/get-all`
    )

    store.dispatch(setPosts(response.data))

    return {
      props: {},
    }
  })
