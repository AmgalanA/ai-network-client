import { GetServerSideProps } from 'next'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { wrapper } from '../../app/store'
import { IPost } from '../../types/post/IPost'
import { IProfile } from '../../types/profile/IProfile'
import { useTypedSelector } from '../../app/hooks'
import { setProfile } from '../../slices/profile/profileSlice'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Comment from '../../components/MainPart/Comment/Comment'
import Header from '../../components/MainPart/Header'
import CreatePostModal from '../../components/MainPart/Modals/CreatePostModal'

interface IProp {
  post: IPost
}

const styles = {
  wrapper: `grid md:grid-cols-2 gap-5 p-10`,
  image: `rounded-3xl xl:mx-auto`,
  infoContainer: `flex flex-col space-y-3`,
  title: `text-2xl font-bold`,
  text: `text-gray-700`,
  creatorContainer: `flex items-center space-x-3`,
  avatar: `h-10 w-10 rounded-full object-cover`,
  creatorName: `cursor-pointer border-b font-bold`,
  addCommentContainer: `flex items-center space-x-1`,
  commentInput: `flex flex-1 outline-none border pl-3 py-2 rounded-full placeholder:text-sm`,
  sendButton: `bg-red-500 text-white font-semibold px-4 py-1 rounded-full`,
  showMore: `text-blue-500 font-light text-center cursor-pointer`,
}

const PostPage = ({ post }: IProp) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [creator, setCreator] = useState({} as IProfile)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [showingMore, setShowingMore] = useState(false)

  const profile = useTypedSelector((store) => store.profileReducer.profile)
  const isShowingCreatePostModal = useTypedSelector(
    (store) => store.showingReducer.isShowingCreatePostModal
  )

  useEffect(() => {
    const getProfileById = async () => {
      const response = await axios.post<IProfile>(`/api/profile/getById`, {
        id: post.creatorId,
      })
      setCreator(response.data)
    }
    getProfileById()
  }, [])

  useEffect(() => {
    const checkProfile = async () => {
      if (localStorage.getItem('token') !== undefined) {
        const token = localStorage.getItem('token')

        const response = await axios.post(`/api/profile/getByToken`, { token })

        if (!response.data) router.push(`/profile/create`)
        else {
          dispatch(setProfile(response.data))
        }
      }
    }

    checkProfile()
  }, [])

  const sendComment = async () => {
    setLoading(true)

    if (profile) {
      const payload = {
        comment: text,
        senderId: profile.id,
      }

      const response = await axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/post/send-comment/${post.id}`,
          payload
        )
        .then(() => router.reload())
    }

    setLoading(false)
  }

  return (
    <>
      <Header />
      {isShowingCreatePostModal ? (
        <CreatePostModal />
      ) : (
        <div className={styles.wrapper}>
          <img
            className={styles.image}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${post.imageUrl}`}
          />
          <div className={styles.infoContainer}>
            <h1 className={styles.title}>{post.title}</h1>
            <h2 className={styles.text}>{post.text}</h2>
            <div className={styles.creatorContainer}>
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
                {creator.name} {creator.secondName}
              </h1>
            </div>

            <h1 className={styles.title}>Comments</h1>
            <div className={styles.addCommentContainer}>
              {profile && (
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${profile.avatar}`}
                  className={styles.avatar}
                />
              )}
              <input
                className={styles.commentInput}
                type="text"
                placeholder="Add a comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                disabled={!text || loading}
                onClick={sendComment}
                className={styles.sendButton}
                type="button"
              >
                Done
              </button>
            </div>
            {post.comments.length > 0 && (
              <div>
                {post.comments.slice(0, 4).map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
                {post.comments.length > 4 &&
                  (!showingMore ? (
                    <h1
                      onClick={() => setShowingMore(true)}
                      className={styles.showMore}
                    >
                      Show More {post.comments.length - 4}
                    </h1>
                  ) : (
                    <h1
                      onClick={() => setShowingMore(false)}
                      className={styles.showMore}
                    >
                      Show Less
                    </h1>
                  ))}
                {showingMore && (
                  <div>
                    {post.comments.slice(4).map((comment) => (
                      <Comment key={comment.id} comment={comment} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default PostPage

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    const response = await axios.get<IProp>(
      `${process.env.BASE_URL}/post/get-one/${params?.id}`
    )

    return {
      props: {
        post: response.data.post,
      },
    }
  })
