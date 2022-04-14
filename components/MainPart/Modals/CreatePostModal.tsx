import axios from 'axios'
import { useRef, useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../app/hooks'
import { addPost } from '../../../slices/posts/postsSlice'
import { setIsShowingCreatePostModal } from '../../../slices/showing/showingSlice'
import { IPost } from '../../../types/post/IPost'

const styles = {
  wrapper: `px-5 py-10`,
  container: `border-4 border-dotted h-full w-full font-semibold h-80 bg-gray-100 flex flex-col items-center justify-center`,
  addImageContainer: `w-full font-semibold p-2 h-80 bg-gray-100 flex flex-col items-center justify-center`,
  uploadImageContainer: `flex flex-col items-center cursor-pointer`,
  cancelUploadPhoto: `cursor-pointer`,
  formContainer: `flex flex-col space-y-3 items-start`,
  header: `flex items-center space-x-4 mt-5`,
  input: `outline-none bg-none w-full font-bold placeholder:font-normal`,
  avatar: `h-12 rounded-full`,
  name: `font-bold`,
  button: `w-full text-center bg-red-600 text-white font-bold py-2 rounded-full`,
}

const CreatePostModal = () => {
  const dispatch = useDispatch()

  const [image, setImage] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  const fileRef = useRef<HTMLInputElement>(null)

  const profile = useTypedSelector((store) => store.profileReducer.profile)

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const createPost = async () => {
    if (profile) {
      setLoading(true)
      const formData = new FormData()
      formData.append('title', title)
      formData.append('text', text)
      formData.append('creatorId', profile.id.toString())
      formData.append('image', image)
      const response = await axios
        .post<IPost>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/post/create`,
          formData
        )
        .then((response) => {
          dispatch(setIsShowingCreatePostModal(false))
          dispatch(addPost(response.data))
        })
        .catch((error) => console.log(error))
      setLoading(false)
    }
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
          <input type="file" hidden ref={fileRef} onChange={addImage} />
        </div>
      </div>
      <div className={styles.formContainer}>
        <header className={styles.header}>
          <img
            className={styles.avatar}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${profile.avatar}`}
          />
          <h1 className={styles.name}>
            {profile.name} {profile.secondName}
          </h1>
        </header>
        <input
          className={styles.input}
          type="text"
          placeholder="Add Title to your post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={styles.input}
          placeholder="Your text"
        />
        <button
          onClick={createPost}
          disabled={!title || !text || !image}
          className={styles.button}
          type="button"
        >
          Add Post
        </button>
      </div>
    </div>
  )
}

export default CreatePostModal
