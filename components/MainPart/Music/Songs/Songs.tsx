import { useTypedSelector } from '../../../../app/hooks'
import Player from './Player'
import Song from './Song'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { useRouter } from 'next/router'

const styles = {
  wrapper: `bg-slate-100`,
  songsContainer: `flex flex-col space-y-3`,
  addContainer: `my-3 flex justify-end items-center`,
  add: `border-blue-500/60 flex items-center px-5 py-2 rounded-xl space-x-2 cursor-pointer hover:bg-blue-100/60 mr-10 border-4 hover:border-blue-500 `,
  icon: `text-2xl`,
}

const Songs = () => {
  const router = useRouter()

  const songs = useTypedSelector((store) => store.musicReducer.songs)
  return (
    <div className={styles.wrapper}>
      <div className={styles.addContainer}>
        <div
          onClick={() => router.push(`/music/create-song`)}
          className={styles.add}
        >
          <div className={styles.icon}>
            <AiOutlineFileAdd />
          </div>
          <h1>Add new track</h1>
        </div>
      </div>

      <div className={styles.songsContainer}>
        {songs.map((song) => (
          <Song key={song.id} song={song} />
        ))}
      </div>
      <Player />
    </div>
  )
}

export default Songs
