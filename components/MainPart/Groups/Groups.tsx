import { useTypedSelector } from '../../../app/hooks'
import Group from './Group'
import { IoMdAdd } from 'react-icons/io'
import { useRouter } from 'next/router'

const styles = {
  wrapper: `flex flex-col items-end`,
  header: `flex items-center w-full my-3`,
  groups: `font-bold w-full text-center text-xl`,
  groupsContainer: `flex flex-col w-full space-y-3 my-5`,
  createContainer: `flex cursor-pointer mr-5 ml-auto hover:bg-opacity-80  justify-center rounded-xl items-center text-xl bg-gradient-to-b from-indigo-700 to-indigo-900 w-12 h-12 text-white`,
}

const Groups = () => {
  const router = useRouter()
  const groups = useTypedSelector((store) => store.groupsReducer.groups)
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.groups}>Groups</h1>

        <div
          onClick={() => router.push(`/groups/create`)}
          className={styles.createContainer}
        >
          <IoMdAdd />
        </div>
      </header>
      <div className={styles.groupsContainer}>
        {groups.map((group) => (
          <Group key={group.id} group={group} />
        ))}
      </div>
    </div>
  )
}

export default Groups
