import Masonry from 'react-masonry-css'
import { IPost } from '../../types/post/IPost'
import Post from '../MainPart/Post/Post'

interface IProp {
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

const MasonryLayout = ({ posts }: IProp) => {
  return (
    <div className={styles.container}>
      <Masonry className={styles.masonry} breakpointCols={breakpointObj}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Masonry>
    </div>
  )
}

export default MasonryLayout
