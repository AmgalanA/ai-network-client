import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IComment } from '../../../types/comment/IComment'
import { IProfile } from '../../../types/profile/IProfile'
import Timeago from 'timeago-react'

interface IProp {
  comment: IComment
}

const styles = {
  wrapper: `bg-slate-100 my-2 rounded-lg p-2 flex justify-between`,
  container: ``,
  header: `flex space-x-2 font-semibold items-center`,
  avatar: `w-10 h-10 object-cover rounded-full`,
  senderName: `cursor-pointer`,
  sentAt: `font-extralight text-sm`,
}

const Comment = ({ comment }: IProp) => {
  const router = useRouter()

  const [sender, setSender] = useState({} as IProfile)

  useEffect(() => {
    const getSenderById = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/get-by-id/${comment.senderId}`
      )

      setSender(response.data)
    }

    getSenderById()
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1
            onClick={() => router.push(`/profile/${sender.id}`)}
            className={styles.senderName}
          >
            {sender.name} {sender.secondName}
          </h1>
          <img
            className={styles.avatar}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${sender.avatar}`}
          />
        </header>
        <span>{comment.comment}</span>
      </div>
      <Timeago className={styles.sentAt} datetime={comment.sentAt} />
    </div>
  )
}

export default Comment
