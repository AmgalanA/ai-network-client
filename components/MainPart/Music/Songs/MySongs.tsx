import { useRouter } from 'next/router'
import { useTypedSelector } from '../../../../app/hooks'
import Song from './Song'
import Songs from './Songs'

const styles = {
  list: `flex items-center`,
  listItem: `border-b hover:border-blue-500 px-3 cursor-pointer`,
  noSong: `text-center w-full py-4 text-black font-bold text-lg`,
}

const MySongs = () => {
  const profile = useTypedSelector((store) => store.profileReducer.profile)

  return (
    <div>
      {profile?.songs.length > 0 ? (
        <Songs clientSongs={profile.songs} />
      ) : (
        <div className={styles.noSong}>
          <h1>No Songs</h1>
          <h2>Start adding some!</h2>
        </div>
      )}
    </div>
  )
}

export default MySongs
