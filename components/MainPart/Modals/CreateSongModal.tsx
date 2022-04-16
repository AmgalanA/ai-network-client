import axios from 'axios'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import { FcAudioFile } from 'react-icons/fc'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../app/hooks'
import { addSong } from '../../../slices/music/musicSlice'

const styles = {
  wrapper: `px-5 py-10`,
  container: `border-4 border-dotted h-full w-full font-semibold h-80 bg-gray-100 flex flex-col items-center justify-center`,
  addImageContainer: `w-full font-semibold p-2 h-80 bg-gray-100 flex flex-col items-center justify-center`,
  uploadImageContainer: `flex flex-col items-center cursor-pointer`,
  cancelUploadPhoto: `cursor-pointer`,
  formContainer: `flex mt-3 flex-col space-y-4 items-start`,
  header: `flex items-center space-x-4 mt-5`,
  input: `outline-none border-b bg-none w-full font-bold placeholder:font-normal`,
  avatar: `h-12 rounded-full`,
  name: `font-bold`,
  button: `w-full text-center bg-red-600 text-white font-bold py-2 rounded-full`,
  addSongContainer: ` w-full hover:bg-gray-200/90 rounded-b-xl bg-gray-200 flex space-y-1 flex-col items-center justify-center h-20`,
  audioIcon: `text-3xl cursor-pointer`,
  addAudioText: `font-bold text-base`,
}

const CreateSongModal = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [image, setImage] = useState<any>(null)
  const [audio, setAudio] = useState<any>(null)
  const [songName, setSongName] = useState<string>('')
  const [songDescription, setSongDescription] = useState<string>('')
  const [songArtist, setSongArtist] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const fileRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLInputElement>(null)

  const profile = useTypedSelector((store) => store.profileReducer.profile)

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const addAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudio(e.target.files[0])
    }
  }

  const createSong = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('name', songName)
    formData.append('description', songDescription)
    formData.append('artist', songArtist)
    formData.append('name', songName.toString())
    formData.append('creatorId', profile.id.toString())
    formData.append('picture', image)
    formData.append('audio', audio)
    console.log(songName)

    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/music/create`, formData)
      .then((res) => {
        dispatch(addSong(res.data))
        router.back()
      })
      .catch((error) => console.error(error))

    setLoading(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.addImageContainer}>
        <div className={styles.container}>
          {image ? (
            <>
              <h1>You succesfully uploaded photo</h1>
              <h2
                className={styles.cancelUploadPhoto}
                onClick={() => setImage('')}
              >
                Cancel
              </h2>
            </>
          ) : (
            <>
              <div
                onClick={() => fileRef.current?.click()}
                className={styles.uploadImageContainer}
              >
                <BsCloudUpload />
                <h1>Click to Upload</h1>
              </div>
            </>
          )}
          <input
            accept="image/*"
            type="file"
            hidden
            ref={fileRef}
            onChange={addImage}
          />
        </div>
      </div>
      <div className={styles.addSongContainer}>
        <input
          type="file"
          accept="audio/*"
          hidden
          ref={audioRef}
          onChange={addAudio}
        />
        {audio ? (
          <>
            <h1>You succesfully uploaded audio to your song</h1>
            <h2
              className={styles.cancelUploadPhoto}
              onClick={() => setAudio('')}
            >
              Cancel
            </h2>
          </>
        ) : (
          <>
            <div
              onClick={() => audioRef.current?.click()}
              className={styles.audioIcon}
            >
              <FcAudioFile />
            </div>
            <h1 className={styles.addAudioText}>Add Audio</h1>
          </>
        )}
      </div>
      <div className={styles.formContainer}>
        <input
          className={styles.input}
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          type="text"
          placeholder="Enter a name of your song"
        />
        <input
          className={styles.input}
          value={songDescription}
          onChange={(e) => setSongDescription(e.target.value)}
          type="text"
          placeholder="Enter a description of your song"
        />
        <input
          className={styles.input}
          value={songArtist}
          onChange={(e) => setSongArtist(e.target.value)}
          type="text"
          placeholder="Who is an artist of song"
        />
        <button
          onClick={createSong}
          disabled={
            loading ||
            !songName ||
            !songDescription ||
            !songArtist ||
            !audio ||
            !image ||
            !profile
          }
          className={styles.button}
        >
          Create a new song
        </button>
      </div>
    </div>
  )
}

export default CreateSongModal
