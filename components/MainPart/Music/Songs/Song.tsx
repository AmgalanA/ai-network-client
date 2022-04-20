import { GrAdd } from 'react-icons/gr'
import { BsFillPlayFill, BsFillPauseCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { AiOutlineCheck } from 'react-icons/ai'

import { ISong } from '../../../../types/music/ISong'
import {
  setPause,
  setPlayingSong,
} from '../../../../slices/music/playingSongSlice'
import { useTypedSelector } from '../../../../app/hooks'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

interface IProp {
  song: ISong
}

const styles = {
  wrapper: `hover:bg-gray-200 p-3 mx-3 rounded-xl`,
  songContainer: `flex w-full space-x-3 items-center`,
  songImage: `w-16 h-16 object-cover rounded-xl`,
  songInfoContainer: `flex flex-col items-start`,
  songName: `font-bold cursor-pointer hover:border-b border-black`,
  songArtist: ``,
  playIcon: `cursor-pointer text-xl hover:bg-gray-300 rounded-full p-1`,
  add: `text-2xl cursor-pointer transition-all duration-500 hover:bg-slate-100 rounded-full p-1`,
}

const Song = ({ song }: IProp) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const playingSong = useTypedSelector((store) => store.playingSongReducer.song)
  const pause = useTypedSelector((store) => store.playingSongReducer.pause)
  const profile = useTypedSelector((store) => store.profileReducer.profile)

  const [loading, setLoading] = useState(false)
  const [isHas, setIsHas] = useState<boolean>(false)

  const play = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/music/listen/${song.id}`
    )
    console.log(response)
    dispatch(setPause(true))
    dispatch(setPlayingSong(song))
  }

  const addMusic = async () => {
    if (loading) return
    setLoading(true)

    const response = await axios
      .post(`/api/music/addToProfile`, {
        profileId: profile.id,
        songId: song.id,
      })
      .then(() => router.reload())
      .catch((error) => console.log(error))

    setLoading(false)
  }

  useEffect(() => {
    const checkIfProfileHasSong = async () => {
      setLoading(true)

      const response = await axios.post(`/api/music/checkIfUserProfileSong`, {
        profileId: profile.id,
        songId: song.id,
      })
      setIsHas(response.data)

      setLoading(false)
    }
    if (profile) checkIfProfileHasSong()
  }, [profile])

  return (
    <div className={styles.wrapper}>
      <div className={styles.songContainer}>
        <img
          className={styles.songImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${song.picture}`}
          alt="song-image"
        />
        <div className={styles.songInfoContainer}>
          <h1
            onClick={() => router.push(`/music/song/${song.id}`)}
            className={styles.songName}
          >
            {song.name}
          </h1>
          <h2 className={styles.songArtist}>{song.artist}</h2>
        </div>
        <div onClick={play} className={styles.playIcon}>
          {!pause && song.id === playingSong.id ? (
            <BsFillPauseCircleFill />
          ) : (
            <BsFillPlayFill />
          )}
        </div>
        {loading ? (
          <div>Loading</div>
        ) : isHas ? (
          <AiOutlineCheck />
        ) : (
          <GrAdd className={styles.add} onClick={addMusic} />
        )}
      </div>
    </div>
  )
}

export default Song
