import { useState } from 'react'
import { GrAdd } from 'react-icons/gr'

import { ISong } from '../../../../types/music/ISong'
import Comment from '../../Comment/Comment'
import SongComment from '../../Comment/SongComment'
import Song from './Song'

interface IProp {
  song: ISong
  artistSongs: ISong[]
}

const styles = {
  wrapper: `flex flex-col mt-10 w-full`,
  container: `flex space-x-3`,
  picture: `w-40 h-fit object-cover`,
  infoContainer: `flex flex-col w-full`,
  showMore: `text-blue-500 font-light text-center cursor-pointer`,
  buttonsContainer: `my-3 text-lg`,
  button: `hover:bg-gray-200 p-1 rounded-full`,
  name: `font-bold text-lg`,
  artist: `font-light text-sm -mt-1`,
  description: `border-t-2 w-full`,
  commentSection: ``,
  anotherSongs: `my-3 font-bold text-center border-b-2 pb-1`,
}

const SongScreen = ({ song, artistSongs }: IProp) => {
  const [showingMore, setShowingMore] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img
          className={styles.picture}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${song.picture}`}
          alt="song-picture"
        />
        <div className={styles.infoContainer}>
          <h1 className={styles.name}>{song.name}</h1>
          <h2 className={styles.artist}>{song.artist}</h2>
          <div className={styles.buttonsContainer}>
            <button className={styles.button}>
              <GrAdd />
            </button>
          </div>
          <span className={styles.description}>{song.description}</span>
        </div>
      </div>
      {song.comments.length > 0 && (
        <div>
          {song.comments.slice(0, 4).map((comment) => (
            <SongComment key={comment.id} comment={comment} />
          ))}
          {song.comments.length > 4 &&
            (!showingMore ? (
              <h1
                onClick={() => setShowingMore(true)}
                className={styles.showMore}
              >
                Show More {song.comments.length - 4}
              </h1>
            ) : (
              <h1
                onClick={() => setShowingMore(false)}
                className={styles.showMore}
              >
                Show Less
              </h1>
            ))}
          {showingMore && (
            <div>
              {song.comments.slice(4).map((comment) => (
                <SongComment key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      )}
      <h1 className={styles.anotherSongs}>Another songs of {song.artist}</h1>
      {artistSongs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  )
}

export default SongScreen
