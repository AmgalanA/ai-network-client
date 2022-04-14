import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Timeago from 'timeago-react'

import { IMessage } from '../../../../types/message/IMessage'
import { IProfile } from '../../../../types/profile/IProfile'

const styles = {
  wrapper: `flex items-start space-x-2`,
  avatar: `w-16 h-16 rounded-full object-cover`,
  messageContainer: `flex flex-col`,
  senderName: `cursor-pointer font-semibold text-blue-600/90`,
  text: `text-[18px] mt-2`,
  senderContainer: `flex items-start space-x-2`,
  sentAt: `text-xs font-extralight mt-[6px]`,
}

interface IProp {
  message: IMessage
}

const Message = ({ message }: IProp) => {
  const router = useRouter()

  const [sender, setSender] = useState<IProfile>({} as IProfile)

  useEffect(() => {
    const getSender = async () => {
      const response = await axios.post(`/api/profile/getById`, {
        id: message.senderId,
      })
      setSender(response.data)
    }
    getSender()
  }, [])

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.avatar}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${sender?.avatar}`}
        alt="avatar"
      />
      <div className={styles.messageContainer}>
        <div className={styles.senderContainer}>
          <h1
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/profile/${sender.id}`)
            }}
            className={styles.senderName}
          >
            {sender?.name} {sender?.secondName}
          </h1>
          <Timeago className={styles.sentAt} datetime={message.sentAt} />
        </div>

        <span className={styles.text}>{message.text}</span>
      </div>
    </div>
  )
}

export default Message
