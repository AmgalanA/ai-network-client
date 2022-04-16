import { ISong } from '../../../../types/music/ISong'
import { BsFillPlayFill, BsFillPauseCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import {
  setPause,
  setPlayingSong,
} from '../../../../slices/music/playingSongSlice'
import { useTypedSelector } from '../../../../app/hooks'
import { useEffect } from 'react'

interface IProp {
  song: ISong
}

const styles = {
  wrapper: `hover:bg-gray-200 p-3 mx-3 rounded-xl`,
  songContainer: `flex w-full space-x-3 items-center`,
  songImage: `w-16 h-16 object-cover rounded-xl`,
  songInfoContainer: `flex flex-col items-start`,
  playIcon: `cursor-pointer text-xl hover:bg-gray-300 rounded-full p-1`,
}

const Song = ({ song }: IProp) => {
  const dispatch = useDispatch()

  const playingSong = useTypedSelector((store) => store.playingSongReducer.song)
  const pause = useTypedSelector((store) => store.playingSongReducer.pause)

  const play = () => {
    dispatch(setPlayingSong(song))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.songContainer}>
        <img
          className={styles.songImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${song.picture}`}
          alt="song-image"
        />
        <div className={styles.songInfoContainer}>
          <h1>{song.name}</h1>
          <h2>{song.artist}</h2>
        </div>
        <div onClick={play} className={styles.playIcon}>
          {!pause && song.id === playingSong.id ? (
            <BsFillPauseCircleFill />
          ) : (
            <BsFillPlayFill />
          )}
        </div>
      </div>
    </div>
  )
}

export default Song
