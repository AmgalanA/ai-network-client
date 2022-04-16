import { useRouter } from 'next/router'
import TimeAgo from 'timeago-react'
import { IGroup } from '../../../types/groups/IGroup'

interface IProp {
  group: IGroup
}

const styles = {
  wrapper: `flex items-center px-5`,
  image: `w-24 h-24 rounded-full object-cover`,
  contentContainer: `flex justify-between flex-1 pl-2`,
  groupInfoContainer: `flex flex-col items-start`,
  name: `cursor-pointer hover:border-b border-blue-500 font-bold text-blue-500`,
  description: `font-extralight text-black text-sm`,
  createdAt: ``,
  members: `font-light text-sm`,
}

const Group = ({ group }: IProp) => {
  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${group.imageUrl}`}
        alt="group-image"
      />

      <div className={styles.contentContainer}>
        <div className={styles.groupInfoContainer}>
          <h1
            onClick={() => router.push(`/group/${group.id}`)}
            className={styles.name}
          >
            {group.name}
          </h1>
          <h2 className={styles.description}>
            {group.description.slice(0, 20)}...
          </h2>
          <h3 className={styles.members}>
            {group.members.length > 0 ? group.members.length : 'No members'}{' '}
            Members
          </h3>
        </div>
        <TimeAgo className={styles.createdAt} datetime={group.createdAt} />
      </div>
    </div>
  )
}

export default Group
