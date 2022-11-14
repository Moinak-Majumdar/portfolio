import Link from "next/link";
import { useRouter } from "next/router";
import Navbar3 from './Navbar3'

const link = [
  {
    name : 'Home',
    url : '/'
  },
  {
    name: 'Projects',
    url : '/Projects'
  },
  {
    name: 'Blossoms',
    url: '/Blossoms'
  }
]

const Header = ({theme, setTheme, darkMode, setDarkMode}) => {

  const router = useRouter()
  return (
    <>
        <Navbar3 theme={theme} setTheme={setTheme} darkMode={darkMode} setDarkMode={setDarkMode}/>
        <header className='bg-transparent absolute inset-0 h-fit py-3 min-w-full px-4 md:px-14 lg:px-20 xl:px-40 2xl:px-48 flex flex-wrap items-center justify-end'>
            <nav className={`flex items-center lg:text-xl text-lg gap-8 md:mr-16 xl:mr-44 ${darkMode ? 'text-gray-200': 'text-black'}`}>
               {link.map((curr, index) => {
                  return (
                    <Link href={curr.url} key={index}>
                      <a className={`hidden font-ubuntu capitalize md:inline-block ${router.pathname === curr.url ? "font-ubuntu underline underline-offset-8" : ""}`}>
                        {curr.name}
                      </a>
                    </Link>
                  )
               })}
              <Link href='mailto:moinak2030@gmail.com'>
                <a className='hidden md:inline-block font-roboto font-semibold tracking-wider text-lg md:text-xl cursor-pointer' style={{color : `${theme.val}`}}>moinak2030@gmail.com</a>
              </Link>
            </nav>
        </header>
    </>
  )
}

export default Header