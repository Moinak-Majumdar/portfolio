import Link from "next/link";
import {usePathname} from 'next/navigation'
import SideNavBar from './SideNavBar'
import AnimatedHeading from "../tools/AnimatedHeading";
import { useFont } from "@/context/FontProvider";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


const link = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'Projects',
    url: '/Projects'
  },
  {
    name: 'Blossoms',
    url: '/Blossoms'
  }
]



const Header = () => {

  const { comicNeue, roboto, ubuntu, pacifico} = useFont();
  const darkMode = useSelector((s: RootState) => s.darkMode.mode);
  const theme = useSelector((s: RootState) => s.colorTheme);
  const pathName = usePathname()

  return (
    <>
      <header className='absolute inset-0 h-fit py-3 min-w-full px-4 md:px-10 lg:px-16 xl:px-36 2xl:px-44 flex flex-wrap items-center justify-between z-40'>
        <AnimatedHeading title='moinak05' classList="hidden md:inline-block xl:text-4xl text-3xl" font={pacifico} />
        <nav className={`flex items-center lg:text-xl text-base gap-4 lg:gap-6 xl:gap-8  ${darkMode ? 'text-gray-200' : 'text-black'}`}>
          {link.map((curr, index) => {
            return (
              <Link href={curr.url} key={index} style={ubuntu.style} className={`hidden capitalize md:inline-block noSelection ${pathName === curr.url ? "font-ubuntu underline underline-offset-8 cursor-pointer" : ""}`}>
                {curr.name}
              </Link>
            )
          })}
          <Link href='mailto:moinak2030@gmail.com' className={`hidden md:inline-block font-semibold tracking-wider text-base lg:text-xl cursor-pointer ${roboto.className}`} style={{ color: `${theme.val}`}}>
            moinak2030@gmail.com
          </Link>
        </nav>
      </header>
      <SideNavBar />
    </>
  )
}

export default Header