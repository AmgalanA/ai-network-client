import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { IToken } from '../../pages/api/profile/getByToken'
import { useDispatch } from 'react-redux'
import { setProfile } from '../../slices/profile/profileSlice'
import { useTypedSelector } from '../../app/hooks'
import { useRouter } from 'next/router'

const styles = {
  wrapper: `h-screen flex flex-col items-center justify-start`,
  container: `h-full w-full relative`,
  video: `h-full w-full object-cover`,
  authContainer: `absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col`,
  contentContainer: `flex flex-col space-y-3 items-center bg-black/40 p-10 rounded-xl`,
  heading: `font-bold text-3xl text-white`,
  authHeading: `text-white font-extralight`,
  authButtons: `text-blue-500 text-lg -mb-2 font-extralight cursor-pointer`,
  registerContainer: ``,
  loginContainer: `flex flex-col space-y-3 items-center`,
  loginHeading: `text-white font-bold text-lg`,
  formContainer: `flex flex-col items-center justify-center space-y-4`,
  input: `outline-none bg-transparent pl-2 py-1 border-b text-white`,
  loginButton: `bg-blue-500/90 py-1 rounded-lg text-white font-semibold w-full`,
  addAvatar: `cursor-pointer bg-gray-300 w-full py-2 px-3 rounded-lg font-semibold`,
  avatarSelectedContainer: `flex flex-col items-center`,
}

const Create = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { profile } = useTypedSelector((state) => state.profileReducer)

  const [name, setName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [status, setStatus] = useState('')
  const [image, setImage] = useState<any>('')
  const [error, setError] = useState('')

  const imageRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (profile) router.push('/')
  }, [profile])

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }
  const create = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (
      !name ||
      !secondName ||
      !status ||
      !image ||
      !localStorage.getItem('token')
    )
      return

    if (localStorage.getItem('token')) {
      const { email } = jwt_decode<IToken>(
        JSON.stringify(localStorage.getItem('token'))
      )

      const formData = new FormData()
      formData.append('name', name)
      formData.append('secondName', secondName)
      formData.append('status', status)
      formData.append('avatar', image)
      formData.append('email', email)
      const response = await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/create`, formData)
        .then((res) => {
          dispatch(setProfile(res.data))
        })
        .catch((error) => setError('Error creating profile: ' + error.message))
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <video
          src={`${process.env.BASE_URL}/video/share.mp4`}
          typeof="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className={styles.video}
        />
        <div className={styles.authContainer}>
          <div className={styles.contentContainer}>
            <h1 className={styles.heading}>
              Create Your Profile in AI Network
            </h1>

            <form className={styles.formContainer}>
              <input
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
              />
              <input
                className={styles.input}
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                type="text"
                placeholder="Enter your second name"
              />
              <input
                className={styles.input}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                type="text"
                placeholder="Enter your status"
              />
              <h1
                className={styles.addAvatar}
                onClick={() => imageRef.current?.click()}
              >
                Add Avatar to Profile
              </h1>
              {!image ? (
                <input type="file" ref={imageRef} hidden onChange={addImage} />
              ) : (
                <div className={styles.avatarSelectedContainer}>
                  <h1>You selected avatar succesfully</h1>
                  <h2 onClick={() => setImage(null)}>Cancel</h2>
                </div>
              )}
              <button
                onClick={create}
                type="submit"
                disabled={!name || !secondName || !status || !image}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
