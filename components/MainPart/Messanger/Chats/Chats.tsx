import { IChat } from '../../../../types/chat/IChat'
import Chat from './Chat'

interface IProp {
  chats: IChat[]
}

const styles = {
  wrapper: ``,
  chatsContainer: `flex flex-col`,
}

const Chats = ({ chats }: IProp) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.chatsContainer}>
        {chats.map((chat) => (
          <Chat key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  )
}

export default Chats
