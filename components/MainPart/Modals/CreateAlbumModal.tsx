import axios from 'axios'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../app/hooks'
import { addAlbum } from '../../../slices/albums/albumsSlice'

const styles = {
  wrapper: `px-5 py-10`,
  container: `border-4 border-dotted h-full w-full font-semibold h-80 bg-gray-100 flex flex-col items-center justify-center`,
  addImageContainer: `w-full font-semibold p-2 h-80 bg-gray-100 flex flex-col items-center justify-center`,
  uploadImageContainer: `flex flex-col items-center cursor-pointer`,
  cancelUploadPhoto: `cursor-pointer`,
  formContainer: `flex flex-col space-y-3 items-start`,
  header: `flex items-center space-x-4 mt-5 mb-2`,
  input: `outline-none my-1 bg-none w-full font-bold placeholder:font-normal`,
  avatar: `w-12 h-12 object-cover rounded-full`,
  name: `font-bold`,
  button: `w-full mt-2 text-center bg-red-600 text-white font-bold py-2 rounded-full`,
}

const CreateAlbumModal = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [image, setImage] = useState<any>('')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const fileRef = useRef<HTMLInputElement>(null)

  const profile = useTypedSelector((store) => store.profileReducer.profile)

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const createAlbum = async () => {
    setLoading(true)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('picture', image)
    formData.append('creatorId', profile.id.toString())

    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/album/create`, formData)
      .then((res) => {
        dispatch(addAlbum(res.data))
        router.back()
      })
      .catch((error) => console.log(error))

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
      <div className={styles.formContainer}>
        <header className={styles.header}>
          <img
            className={styles.avatar}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${profile?.avatar}`}
          />
          <h1 className={styles.name}>
            {profile?.name} {profile?.secondName}
          </h1>
        </header>
      </div>
      <input
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Album name"
      />
      <input
        className={styles.input}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Album description"
      />
      <button
        disabled={loading || !description || !name || !image || !profile}
        onClick={createAlbum}
        className={styles.button}
      >
        Create Album
      </button>
    </div>
  )
}

export default CreateAlbumModal
