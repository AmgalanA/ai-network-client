import Masonry from 'react-masonry-css'
import { IPost } from '../../types/post/IPost'
import Post from '../MainPart/Post/Post'

interface IProp {
  isGroup?: boolean
  posts: IPost[]
}

const styles = {
  wrapper: `flex flex-col flex-[0.9]`,
  container: ``,
  masonry: `flex animate-slide-fwd`,
}

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
}

const MasonryLayout = ({ isGroup, posts }: IProp) => {
  if (!posts) return <div>Loading</div>
  return (
    <div className={styles.container}>
      <Masonry className={styles.masonry} breakpointCols={breakpointObj}>
        {isGroup
          ? posts
              .sort((a, b) => b.id - a.id)
              .map((post) => (
                <Post isGroup={!!post.groupId} key={post.id} post={post} />
              ))
          : posts.map((post) => (
              <Post isGroup={!!post.groupId} key={post.id} post={post} />
            ))}
      </Masonry>
    </div>
  )
}

export default MasonryLayout
