import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { FaRegHandPeace, FaFileSignature, FaHome, FaAngleDoubleLeft, FaUserCheck, } from 'react-icons/fa'
import { BsGearFill, BsCameraFill, BsCodeSlash } from 'react-icons/bs'
import { SiFlutter } from 'react-icons/si'
import { useState, useEffect, ReactNode } from 'react'
import { CgMenuRight } from 'react-icons/cg'
import { BiMessageDetail } from 'react-icons/bi'
import CustomizeModal from './CustomizeModal'
import NavStyle from '../../styles/Navbar.module.css'
import { useFont } from '@/context/FontProvider'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'



const divVariants = {
    open: { width: '300px', height: '100vh', x: '0px' },
    closed: { width: '300px', height: '100vh', x: '500px', transition: { delay: .8 } }
}
const ulVariants = {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
};
const liVariants = {
    open: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 160 } },
    closed: { y: -40, opacity: 0 }
};

interface I_links { name: string, link: string, icon: ReactNode }
const navLinkHome: I_links[] = [
    { name: 'Intro', link: '#intro', icon: <FaRegHandPeace /> },
    { name: 'About Me', link: '#aboutMe', icon: <BiMessageDetail /> },
    { name: 'Tools & Tech', link: '#tech', icon: <BsGearFill /> },
    // { name: 'My Works', link: '#myWorks', icon: <FaUserCheck /> },
    { name: 'Web Projects', link: '#WebProjects', icon: <BsCodeSlash /> },
    { name: 'Flutter Projects', link: '#FlutterProjects', icon: <SiFlutter /> },
    { name: 'My Hobby', link: '#myHobby', icon: <BsCameraFill /> },
    { name: 'Hire Me', link: '#hire', icon: <FaFileSignature /> },
]
const navLinkProjects: I_links[] = [
    { name: 'Home', link: '/', icon: <FaHome /> },
    // { name: 'My Works', link: '#myWorks', icon: <FaUserCheck /> },
    { name: 'Web Projects', link: '#WebProjects', icon: <BsCodeSlash /> },
    { name: 'Flutter Projects', link: '#FlutterProjects', icon: <SiFlutter /> },
    { name: 'My Hobby', link: '/Blossoms', icon: <BsCameraFill /> },
]
const navLinkBlossoms: I_links[] = [
    { name: 'Home', link: '/', icon: <FaHome /> },
    { name: 'Projects', link: '/Projects', icon: <FaUserCheck /> },
]
const navLinkOthers: I_links[] = [
    { name: 'Home', link: '/', icon: <FaHome /> },
    { name: 'Projects', link: '/Projects', icon: <FaUserCheck /> },
    { name: 'Blossoms', link: '/Blossoms', icon: <BsCameraFill /> },
]


const SideNavBar = () => {
    const pathName = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [activeLink, setActiveLink] = useState<string | null>(null)
    const [navLink, setNavLink] = useState<I_links[] | null>(null)

    const { ubuntu, comicNeue, roboto } = useFont();
    const darkMode = useSelector((s: RootState) => s.darkMode.mode);
    const theme = useSelector((s: RootState) => s.colorTheme);

    useEffect(() => {
        if (pathName === '/') {
            setNavLink(navLinkHome)
        } else if (pathName.includes('Blossoms')) {
            setNavLink(navLinkBlossoms)
        } else if (pathName.includes('Projects')) {
            setNavLink(navLinkProjects)
        } else {
            setNavLink(navLinkOthers)
        }
    }, []);

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className={`fixed top-0 right-4 w-fit mt-2 z-50 rounded-full cursor-pointer text-2xl p-[9px] ${darkMode ? 'bg-blue-300' : 'bg-pink-300'}`} area-label='sideNavBar' title='sideNavbar'>
                <CgMenuRight className={darkMode ? 'text-black' : 'text-pink-800'} />
            </button>
            {/* hl3 side navbar */}
            <motion.div
                initial='closed'
                animate={isOpen ? 'open' : 'closed'}
                className={`z-40 fixed top-0 right-0 min-h-full flex ${isOpen ? "w-full" : 'max-w-0'}`}
            >
                <div onClick={() => setIsOpen(!isOpen)} className='bg-transparent min-w-full min-h-full'></div>
                <motion.div
                    variants={divVariants}
                    style={darkMode ? { background: 'linear-gradient(to right,#294861,#0e1c26)', boxShadow: '0px 0px 30px #6b7280' } : { background: 'linear-gradient(#D7DDE8,#BBD2C5)', boxShadow: '0px 0px 30px #374151' }}
                    className={`absolute top-0 right-0 bottom-0 rounded-l-2xl overflow-hidden ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}
                >
                    {navLink && <section className='w-full min-h-full px-4 flex items-center'>
                        <motion.div variants={ulVariants} animate={isOpen ? 'open' : 'closed'} className='min-w-full flex flex-col h-fit'>
                            <motion.h1 variants={liVariants} className='text-3xl lg:text-4xl mt-4 mb-4 lg:mb-12  ml-4'>
                                <span className={ubuntu.className}>useful</span>
                                <span className={`${ubuntu.className} font-bold ml-2`} style={{ color: theme.val }}>Links</span>
                            </motion.h1>
                            {navLink.map((curr, index) => {
                                return (
                                    <motion.div key={index} variants={liVariants} whileTap={{ scale: 0.88 }}>
                                        <a href={curr.link}>
                                            <motion.button onClick={() => setActiveLink(curr.name)} className={`text-2xl ml-4 mb-3 flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-800'}`} style={ubuntu.style}
                                                whileHover={{ scale: 1.2, originX: 0, color: theme.val }}
                                                transition={{ type: 'spring', stiffness: 300 }}
                                            >
                                                {curr.icon}
                                                <span className='ml-3 text-xl'>{curr.name}</span>
                                                <FaAngleDoubleLeft className={activeLink === curr.name ? 'ml-4 text-2xl' : 'hidden'} style={{ color: theme.val }} />
                                            </motion.button>
                                        </a>
                                    </motion.div>
                                )
                            })}
                            <motion.div variants={liVariants} className='mt-4 ml-4' style={comicNeue.style}>
                                <h2>
                                    <span className='capitalize text-xl'>Color Theme :</span>
                                    <span className='ml-2 capitalize text-xl font-bold'>{darkMode ? 'Dark' : 'Lite'}</span>
                                </h2>
                                <h2 className='mt-2'>
                                    <span className='capitalize text-xl'>Color Scheme :</span>
                                    <span className='ml-2 text-xl' style={{ color: theme.val }}>{theme.name}</span>
                                </h2>
                            </motion.div>
                            <motion.div variants={liVariants} className='mt-8 flex flex-col items-center' style={roboto.style}>
                                <button onClick={() => {
                                    setIsDialogOpen(true)
                                    setIsOpen(false)
                                }} type='button' className={NavStyle.button}>Customize</button>
                            </motion.div>
                        </motion.div>
                    </section>}
                </motion.div>
            </motion.div>
            {isDialogOpen && <CustomizeModal visible={isDialogOpen} isClose={()=> {setIsDialogOpen(false)}} />}
        </>
    )
}

export default SideNavBar