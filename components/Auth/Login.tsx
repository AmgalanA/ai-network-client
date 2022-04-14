import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'

const styles = {
  wrapper: `h-screen flex flex-col items-center justify-start`,
  container: `h-full w-full relative`,
  video: `h-full w-full object-cover`,
  authContainer: `absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col`,
  contentContainer: `flex flex-col space-y-3 items-center bg-black/40 p-10 rounded-xl`,
  heading: `font-bold text-3xl text-white`,
  authHeading: `text-white font-extralight`,
  authButtons: `text-blue-500 text-lg -mb-2 font-extralight cursor-pointer`,
  registerContainer: ``,
  loginContainer: `flex flex-col space-y-3 items-center`,
  loginHeading: `text-white font-bold text-lg`,
  formContainer: `flex flex-col items-center justify-center space-y-4`,
  input: `outline-none bg-transparent pl-2 py-1 border-b`,
  loginButton: `bg-blue-500/90 py-1 rounded-lg text-white font-semibold w-full`,
}

interface IResponse {
  token: string
}

const Login = () => {
  const router = useRouter()

  const [whatToShow, setWhatToShow] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const register = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const payload = { email: registerEmail, password: registerPassword }
    try {
      const response = await axios
        .post<AxiosResponse<IResponse>>(`/api/auth/registerUser`, payload)
        .then((response) => {
          localStorage.setItem('token', response.data.data.token)
          router.push('/')
        })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const payload = { email: loginEmail, password: loginPassword }
    try {
      const response = await axios.post<IResponse>(
        `/api/auth/loginUser`,
        payload
      )
      console.log(response)
      localStorage.setItem('token', response.data.token)
      router.push('/')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <video
          src={`${process.env.BASE_URL}/video/share.mp4`}
          typeof="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className={styles.video}
        />
        <div className={styles.authContainer}>
          <div className={styles.contentContainer}>
            {whatToShow === '' ? (
              <>
                <h1 className={styles.heading}>Welcome to AI Network</h1>

                <h2
                  style={{ marginBottom: '-20px' }}
                  className={styles.authHeading}
                >
                  First time here?{' '}
                  <span
                    onClick={() => setWhatToShow('register')}
                    className={styles.authButtons}
                  >
                    register
                  </span>
                </h2>
                <h2 className={styles.authHeading}>
                  Already a member?{' '}
                  <span
                    onClick={() => setWhatToShow('login')}
                    className={styles.authButtons}
                  >
                    login
                  </span>
                </h2>
              </>
            ) : whatToShow === 'register' ? (
              <div className={styles.loginContainer}>
                <h1 className={styles.loginHeading}>Registration</h1>
                <form className={styles.formContainer}>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="Enter your email..."
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Enter your password..."
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                  <button
                    onClick={register}
                    disabled={!registerEmail || !registerPassword}
                    style={{ marginTop: '40px' }}
                    type="submit"
                    className={styles.loginButton}
                  >
                    Register
                  </button>
                  <h2 className={styles.authHeading}>
                    Already a member?{' '}
                    <span
                      onClick={() => setWhatToShow('login')}
                      className={styles.authButtons}
                    >
                      login
                    </span>
                  </h2>
                </form>
              </div>
            ) : (
              <div className={styles.loginContainer}>
                <h1 className={styles.loginHeading}>Login</h1>
                <form className={styles.formContainer}>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="Enter your email..."
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Enter your password..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button
                    onClick={login}
                    disabled={!loginEmail || !loginPassword}
                    style={{ marginTop: '40px' }}
                    type="button"
                    className={styles.loginButton}
                  >
                    Login
                  </button>
                  <h2
                    style={{ marginBottom: '-20px' }}
                    className={styles.authHeading}
                  >
                    First time here?{' '}
                    <span
                      onClick={() => setWhatToShow('register')}
                      className={styles.authButtons}
                    >
                      register
                    </span>
                  </h2>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
