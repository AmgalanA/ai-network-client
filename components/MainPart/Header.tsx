import { useTypedSelector } from '../../app/hooks'
import { BiSearchAlt2 } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { setIsShowingCreatePostModal } from '../../slices/showing/showingSlice'
import { useRouter } from 'next/router'
import { IoMdArrowBack } from 'react-icons/io'
import { useEffect } from 'react'
import axios from 'axios'
import { setProfile } from '../../slices/profile/profileSlice'
import { setSearchQuery } from '../../slices/search/searchSlice'
import { MdOutlineCancel } from 'react-icons/md'

const styles = {
  wrapper: `flex w-full h-fit bg-white py-1 sticky top-0 rounded-md items-center border px-10 space-x-2`,
  back: `cursor-pointer flex items-center justify-center mx-4 cursor-pointer `,
  inputContainer: `flex flex-1 items-center space-x-2`,
  input: `w-full outline-none bg-transparent`,
  avatar: `cursor-pointer hover:scale-105 w-10 h-10 object-cover rounded-full`,
  addContainer: `cursor-pointer hover:bg-black/80 bg-black flex items-center justify-center text-white rounded-lg w-10 h-10`,
  icon: `text-red-600 cursor-pointer`,
}

const Header = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const profile = useTypedSelector((store) => store.profileReducer.profile)
  const { isShowingCreatePostModal } = useTypedSelector(
    (store) => store.showingReducer
  )
  const searchQuery = useTypedSelector(
    (store) => store.searchReducer.searchQuery
  )

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

  if (!profile) return <div>Loading...</div>
  return (
    <header className={styles.wrapper}>
      {router.pathname !== '/' && (
        <div className={styles.back}>
          <IoMdArrowBack onClick={() => router.back()} />
        </div>
      )}
      <div className={styles.inputContainer}>
        <BiSearchAlt2 />
        <input
          className={styles.input}
          type="text"
          onFocus={() =>
            router.push({
              pathname: '/search',
              query: `${
                router.pathname === '/' || router.pathname.includes('/post')
                  ? 'posts'
                  : router.pathname.includes('profile')
                  ? 'profiles'
                  : router.pathname.includes('chats')
                  ? 'chats'
                  : router.pathname.includes('music') ||
                    router.pathname.includes('song')
                  ? 'music'
                  : router.pathname.includes('search') &&
                    Object.keys(router.query)[0]
              }`,
            })
          }
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>
      {searchQuery && (
        <div className={styles.icon} style={{ fontSize: '24px' }}>
          <MdOutlineCancel onClick={() => dispatch(setSearchQuery(''))} />
        </div>
      )}
      <img
        className={styles.avatar}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${profile.avatar}`}
        alt="avatar"
        onClick={() => router.push(`/settings/${profile.id}`)}
      />
      {/* <Timeago datetime={profile.lastSeen} /> */}
      {router.pathname === '/' && (
        <div
          onClick={() => router.push('/post/create')}
          className={styles.addContainer}
        >
          <IoMdAdd />
        </div>
      )}
    </header>
  )
}

export default Header
