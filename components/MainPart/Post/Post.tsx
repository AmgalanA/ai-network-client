import { IPost } from '../../../types/post/IPost'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { IProfile } from '../../../types/profile/IProfile'
import { useRouter } from 'next/router'

interface IProp {
  post: IPost
}

const styles = {
  wrapper: `flex flex-col items-start hover:scale-105 transition-all duration-300 rounded-lg cursor-pointer hover:bg-slate-100/80 p-3 m-3 space-y-3`,
  avatar: `h-12 w-12 object-cover rounded-full`,
  creatorInfoContainer: `flex font-bold space-x-2 items-center justify-start w-full`,
  image: `rounded-lg w-60 lg:w-full`,
  creatorName: `hover:border-b-2 border-blue-500`,
}

const Post = ({ post }: IProp) => {
  const router = useRouter()

  const [creator, setCreator] = useState({} as IProfile)

  useEffect(() => {
    const getProfileById = async () => {
      const response = await axios.post<IProfile>(`/api/profile/getById`, {
        id: post.creatorId,
      })
      setCreator(response.data)
    }
    getProfileById()
  }, [])

  return (
    <div
      onClick={() => router.push(`/post/${post.id}`)}
      className={styles.wrapper}
    >
      <header className={styles.creatorInfoContainer}>
        <img
          className={styles.avatar}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${creator.avatar}`}
        />
        <h1
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/profile/${creator.id}`)
          }}
          className={styles.creatorName}
        >
          {creator.name}
        </h1>
      </header>
      <img
        className={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${post.imageUrl}`}
      />
    </div>
  )
}

export default Post
