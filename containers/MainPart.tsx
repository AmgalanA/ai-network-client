import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Feed from '../components/MainPart/Feed'
import Sidebar from '../components/MainPart/Sidebar'
import { setProfile } from '../slices/profile/profileSlice'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex`,
}

const MainPart = () => {
  const dispatch = useDispatch()
  const router = useRouter()

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

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Feed />
    </div>
  )
}

export default MainPart
