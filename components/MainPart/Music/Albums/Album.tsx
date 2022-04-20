import { useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'

import { IAlbum } from '../../../../types/album/IAlbum'
import { useRouter } from 'next/router'

interface IProp {
  album: IAlbum
}

const styles = {
  wrapper: `flex cursor-pointer hover:bg-gray-50 py-2 items-center`,
  pictureContainer: ` relative w-20`,
  picture: `w-full rounded-lg object-cover`,
  infoContainer: `ml-2`,
  focusWrapper: `absolute top-0 w-full h-full bg-black/30 transition-all duration-1000 rounded-xl flex items-center justify-center text-white`,
  icon: `cursor-pointer`,
  name: `text-lg font-semibold`,
  description: `font-extralight`,
}

const Album = ({ album }: IProp) => {
  const router = useRouter()

  const [isFocus, setIsFocus] = useState<boolean>(false)
  return (
    <div
      onClick={() => router.push(`/album/${album.id}`)}
      className={styles.wrapper}
    >
      <div
        onMouseEnter={() => setIsFocus(true)}
        onMouseLeave={() => setIsFocus(false)}
        className={styles.pictureContainer}
      >
        <img
          className={styles.picture}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${album.picture}`}
          alt="album-picture"
        />
        {isFocus && (
          <div className={styles.focusWrapper}>
            <IoMdSend className={styles.icon} />
            <BsFillPlayFill className={styles.icon} fontSize={30} />
            <AiOutlinePlus className={styles.icon} />
          </div>
        )}
      </div>

      <div className={styles.infoContainer}>
        <h1 className={styles.name}>{album.name}</h1>
        <h2 className={styles.description}>{album.description}</h2>
      </div>
    </div>
  )
}

export default Album
