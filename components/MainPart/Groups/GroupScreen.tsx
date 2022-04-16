import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useTypedSelector } from '../../../app/hooks'
import { IGroup } from '../../../types/groups/IGroup'
import MasonryLayout from '../../Layouts/MasonryLayout'

interface IProp {
  group: IGroup
}

const styles = {
  wrapper: ` bg-slate-100`,
  createContainer: ``,
  groupImage: `w-32 h-32 object-contain`,
  name: `text-lg font-bold`,
  description: ``,
  addContainer: `cursor-pointer hover:bg-black/80 bg-black flex items-center justify-center text-white rounded-lg w-full hover:bg-opacity-80 h-10`,
  header: `flex p-5 items-center justify-between`,
  infoContainer: `flex flex-col items-center`,
}

const GroupScreen = ({ group }: IProp) => {
  const router = useRouter()

  const profile = useTypedSelector((store) => store.profileReducer.profile)

  useEffect(() => {}, [])

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.infoContainer}>
          <h1 className={styles.name}>{group.name}</h1>
          <h2 className={styles.description}>{group.description}</h2>
        </div>
        <img
          className={styles.groupImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${group.imageUrl}`}
          alt="group-image"
        />
      </header>
      {profile?.id === group.creatorId && (
        <div
          onClick={() => router.push(`/group/create-post/${group.id}`)}
          className={styles.addContainer}
        >
          <IoMdAdd />
        </div>
      )}
      {group.posts.length > 0 ? (
        <MasonryLayout isGroup={true} posts={group.posts} />
      ) : (
        <div>
          <h1>No posts</h1>
        </div>
      )}
    </div>
  )
}

export default GroupScreen
