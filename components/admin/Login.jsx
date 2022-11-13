import { useState } from 'react'
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../src/Firebase'
import { VscEye, VscEyeClosed, VscBracketError } from 'react-icons/vsc'
import Button from '../tools/Button';
import Input from '../tools/Input'
import Bg from '../tools/Bg'
import Ring from '../others/Ring';


const classList = {
  boxLite: "lg:w-2/6 md:w-1/2 bg-slate-100  rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-2xl shadow-gray-400 txt1",
  boxDark: "lg:w-2/6 md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-2xl shadow-zinc-900 txt1",
}

const Login = ({ darkMode, theme }) => {

  const [showPass, setShowPass] = useState(false)
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)

  const router = useRouter()

  async function handelSubmit(e) {
    e.preventDefault()

    await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(() => {
        router.push('/admin')
      })
      .catch((error) => {
        setError(error.message)
      });
  }


  return (
    <>
      <section className={`max-h-screen pt-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 text-center md:text-left">
            <p className="leading-relaxed mt-4">Portfolio Dashboard</p>
            <h1 className={darkMode ? 'title-font font-medium text-3xl text-gray-100' : "title-font font-medium text-3xl text-gray-900"}>Administrator - Moinak Majumdar</h1>
          </div>
          <form onSubmit={handelSubmit} className={darkMode ? classList.boxDark : classList.boxLite}>
            {error && <div className='w-full h-auto flex items-center rounded my-4 bg-red-300 px-4 py-2'>
              <VscBracketError className='text-2xl text-black' />
              <h1 className='txt1 ml-4 text-black'>{error}</h1>
            </div>}
            <h2 className={darkMode ? "text-gray-100 text-lg font-medium title-font mb-5" : "text-gray-900 text-lg font-medium title-font mb-5"}>Sign Up</h2>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7">Email</label>
              <Input
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                type="email" id='email'
                darkMode={darkMode} theme={theme} required={true} autoComplete="email"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7">Password</label>
              <Input
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                type={showPass ? "text" : "password"} id='password'
                darkMode={darkMode} theme={theme} required={true} autoComplete='current-password'
              />
            </div>
            <div className='relative mb-4 pl-4'>
              <div className='inline-flex mr-2 cursor-pointer'>
                {showPass && <VscEyeClosed onClick={() => setShowPass(!showPass)} />}
                {!showPass && <VscEye onClick={() => setShowPass(!showPass)} />}
              </div>
              <span onClick={() => setShowPass(!showPass)} className='cursor-pointer'>{showPass && 'Hide Password'}{!showPass && 'Show Password'}</span>
            </div>
            <Button type='submit' theme={theme}>Sign Up</Button>
          </form>
        </div>
        <Ring darkMode={darkMode} />
        <div className="absolute w-full h-full top-0 right-0 -z-40">
          <div className={`absolute w-full h-full inset-0 bg-gradient-to-b z-10 ${darkMode ? 'from-[#141e30]' : 'from-[#ffffff]'}`}></div>
          <Bg
            alt="landing pattern"
            src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
            className={darkMode ? "opacity-50" : "opacity-80"}
          />
        </div>
      </section>
    </>
  )
}

export default Login