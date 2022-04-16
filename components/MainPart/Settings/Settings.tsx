import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../app/hooks'
import { setProfile } from '../../../slices/profile/profileSlice'

const styles = {
  wrapper: `h-screen flex items-center justify-center bg-slate-50`,
  container: `flex flex-col bg-slate-100 `,
  formContainer: `bg-slate-200 p-20 rounded-lg`,
  settingsHeading: `text-xl font-bold text-center`,
  settingsContainer: `my-3 flex flex-col space-y-3`,
  settingContainer: `font-bold text-base flex flex-col space-y-1`,
  input: `outline-none bg-transparent placeholder:font-extralight placeholder:text-sm border-b border-blue-300`,
  button: `disabled:bg-gray-300 py-1 bg-red-500 text-white font-bold rounded-full`,
  logoutContainer: `flex justify-center`,
  logoutButton: `bg-red-500 text-white font-bold py-2 rounded-b-lg w-full`,
}

const Settings = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [status, setStatus] = useState('')

  const profile = useTypedSelector((store) => store.profileReducer.profile)

  const changeProfile = async () => {
    const response = await axios
      .post(`/api/profile/changeProfile`, {
        name,
        secondName,
        status,
        profileId: profile.id,
      })
      .then((response) => dispatch(setProfile(response.data)))
      .catch((error) => console.log(error))
  }

  const logout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.settingsHeading}>General Settings</h1>
          <div className={styles.settingsContainer}>
            <div className={styles.settingContainer}>
              <h2>Change Name: </h2>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.settingContainer}>
              <h2>Change Second Name: </h2>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter Second Name..."
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
              />
            </div>
            <div className={styles.settingContainer}>
              <h2>Change Status: </h2>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter Status Name..."
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <button
              className={styles.button}
              onClick={changeProfile}
              disabled={!name && !secondName && !status}
            >
              Change
            </button>
          </div>
        </div>
        <div className={styles.logoutContainer}>
          <button onClick={logout} className={styles.logoutButton}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
