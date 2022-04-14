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

const styles = {
  wrapper: `flex w-full h-fit bg-white py-1 sticky top-0 rounded-md items-center border px-10 space-x-2`,
  back: `cursor-pointer flex items-center justify-center mx-4 cursor-pointer `,
  inputContainer: `flex flex-1 items-center space-x-2`,
  input: `w-full outline-none bg-transparent`,
  avatar: `w-10 h-10 object-cover rounded-full`,
  addContainer: `cursor-pointer hover:bg-black/80 bg-black flex items-center justify-center text-white rounded-lg w-10 h-10`,
}

const Header = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const profile = useTypedSelector((store) => store.profileReducer.profile)
  const isShowingCreatePostModal = useTypedSelector(
    (store) => store.showingReducer.isShowingCreatePostModal
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
          // onFocus={() => router.push(`/search`)}
          placeholder="Search"
        />
      </div>
      <img
        className={styles.avatar}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${profile.avatar}`}
        alt=""
      />
      {/* <Timeago datetime={profile.lastSeen} /> */}
      <div
        onClick={() =>
          dispatch(setIsShowingCreatePostModal(!isShowingCreatePostModal))
        }
        className={styles.addContainer}
      >
        <IoMdAdd />
      </div>
    </header>
  )
}

export default Header
