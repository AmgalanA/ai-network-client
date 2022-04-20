import { useTypedSelector } from '../../../../app/hooks'
import Player from './Player'
import Song from './Song'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { ISong } from '../../../../types/music/ISong'

const styles = {
  wrapper: `bg-slate-100 w-full`,
  header: `m-5`,
  list: `flex items-center`,
  listItem: `border-b hover:border-blue-500 px-3 cursor-pointer`,
  songsContainer: `overflow-y-auto h-[70%] pb-24 flex flex-col space-y-3`,
  addContainer: `my-3 flex justify-end items-center`,
  add: `border-blue-500/60 flex items-center px-5 py-2 rounded-xl space-x-2 cursor-pointer hover:bg-blue-100/60 mr-10 border-4 hover:border-blue-500 `,
  icon: `text-2xl`,
}

interface IProp {
  clientSongs?: ISong[]
}

const Songs = ({ clientSongs }: IProp) => {
  const router = useRouter()

  const songs = useTypedSelector((store) => store.musicReducer.songs)
  const profile = useTypedSelector((store) => store.profileReducer.profile)
  return (
    <div className={styles.wrapper}>
      {!clientSongs && (
        <>
          <header className={styles.header}>
            <ul className={styles.list}>
              <li
                onClick={() => router.push(`/music`)}
                className={styles.listItem}
              >
                Songs
              </li>
              <li
                onClick={() => router.push(`/music/${profile.id}`)}
                className={styles.listItem}
              >
                My Songs
              </li>
              <li
                className={styles.listItem}
                onClick={() => router.push(`/albums`)}
              >
                Albums
              </li>
              <li
                className={styles.listItem}
                onClick={() => router.push(`/albums/${profile.id}`)}
              >
                My Albums
              </li>
            </ul>
          </header>

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
        </>
      )}

      <div className={styles.songsContainer}>
        {clientSongs && clientSongs.length > 0
          ? clientSongs?.map((song) => <Song key={song.id} song={song} />)
          : songs.map((song) => <Song key={song.id} song={song} />)}
      </div>
      <Player />
    </div>
  )
}

export default Songs
