import { AiFillPauseCircle } from 'react-icons/ai'
import { AiFillFastBackward, AiFillFastForward } from 'react-icons/ai'
import { useTypedSelector } from '../../../../app/hooks'
import {
  BsFillPauseCircleFill,
  BsVolumeDownFill,
  BsFillPlayFill,
} from 'react-icons/bs'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  setCurrentTime,
  setDuration,
  setPause,
  setPlayingSong,
  setVolume,
} from '../../../../slices/music/playingSongSlice'

const styles = {
  wrapper: `fixed bottom-10 w-full xl:w-[80%] bg-slate-100 pr-60 flex space-x-4 items-center m-5 pl-2 py-2 rounded-lg`,
  iconsContainer: `flex items-center text-2xl text-blue-500`,
  pauseContainer: `text-4xl mr-1 text-blue-600`,
  icon: `cursor-pointer`,
  picture: `w-16 h-16 rounded-lg object-cover`,
  songContainer: `flex flex-1 w-full justify-between items-center`,
  songInfoContainer: `flex flex-col space-y-1 items-start`,
  songName: `text-base font-semibold`,
  songArtist: `text-sm font-extralight`,
  songCharContainer: `mr-5`,
  pictureAndTextContainer: `flex items-center space-x-3`,
  changeVolumeContainer: `flex items-center`,
}

let audio: any
const Player = () => {
  const dispatch = useDispatch()

  const songs = useTypedSelector((store) => store.musicReducer.songs)
  const song = useTypedSelector((store) => store.playingSongReducer.song)
  const pause = useTypedSelector((store) => store.playingSongReducer.pause)
  const volume = useTypedSelector((store) => store.playingSongReducer.volume)
  const duration = useTypedSelector(
    (store) => store.playingSongReducer.duration
  )
  const currentTime = useTypedSelector(
    (store) => store.playingSongReducer.currentTime
  )

  useEffect(() => {
    if (!audio) {
      audio = new Audio()
    } else {
      audio.src = `${process.env.NEXT_PUBLIC_BASE_URL}/${song.audio}`
      audio.volume = volume / 100
      audio.onloadedmetadata = () => {
        dispatch(setDuration(Math.ceil(audio.duration)))
      }
      audio.ontimeupdate = () => {
        dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
      }
      play()
    }
  }, [song])

  const play = () => {
    if (pause) {
      dispatch(setPause(false))
      audio.play()
    } else {
      console.log(song)
      dispatch(setPause(true))
      audio.pause()
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    dispatch(setVolume(Number(e.target.value)))
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    dispatch(setCurrentTime(Number(e.target.value)))
  }

  if (!song.picture) return <div></div>

  return (
    <div className={styles.wrapper}>
      <div className={styles.iconsContainer}>
        <div className={styles.pauseContainer}>
          {pause ? (
            <BsFillPlayFill className={styles.icon} onClick={play} />
          ) : (
            <BsFillPauseCircleFill onClick={play} className={styles.icon} />
          )}
        </div>
        <AiFillFastBackward className={styles.icon} />
        <AiFillFastForward className={styles.icon} />
      </div>
      <div className={styles.songContainer}>
        <div className={styles.pictureAndTextContainer}>
          <img
            className={styles.picture}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${song.picture}`}
            alt="song-picture"
          />
          <div className={styles.songInfoContainer}>
            <h1 className={styles.songName}>{song.name}</h1>
            <h2 className={styles.songArtist}>{song.artist}</h2>
            {currentTime > 0 && (
              <input
                min={0}
                max={duration}
                value={currentTime}
                onChange={changeCurrentTime}
                type="range"
              />
            )}
          </div>
        </div>
        <div className={styles.songCharContainer}>
          <span>{currentTime > 0 && `${currentTime}/`}</span>
          <span>
            {duration > 0 && `${Math.floor(duration / 60)}:${duration % 60}`}
          </span>
        </div>
        {currentTime > 0 && (
          <div className={styles.changeVolumeContainer}>
            <BsVolumeDownFill />
            <input type="range" onChange={changeVolume} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Player
