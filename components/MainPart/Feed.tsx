import Masonry from 'react-masonry-css'
import { useTypedSelector } from '../../app/hooks'
import MasonryLayout from '../Layouts/MasonryLayout'
import Header from './Header'
import CreatePostModal from './Modals/CreatePostModal'
import Post from './Post/Post'

const styles = {
  wrapper: `flex flex-col flex-[0.9]`,
}

const Feed = () => {
  const posts = useTypedSelector((store) => store.postsReducer.posts)
  const { isShowingCreatePostModal } = useTypedSelector(
    (store) => store.showingReducer
  )
  return (
    <div className={styles.wrapper}>
      <Header />

      <MasonryLayout posts={posts} />
    </div>
  )
}

export default Feed
