import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { BsBookmarkHeartFill, BsGearFill } from 'react-icons/bs'
import { CgMenuRight } from 'react-icons/cg'
import { MdOutlineDashboardCustomize, } from 'react-icons/md'
import CustomizeModal from '../others/CustomizeModal'
import Button from '../tools/Button'


const divVariants = {
    open: {
        width: '300px',
        height: '100vh',
        x: '0px'
    },
    closed: {
        width: '300px',
        height: '100vh',
        x: '500px',
        transition: { delay: .8 }
    }
}
const ulVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.5 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};
const liVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000 }
        }
    },
    closed: {
        y: -40,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const navLinkHome = [
    { name: 'Intro', link: '#intro' },
    { name: 'About Me', link: '#aboutMe' },
    { name: 'Tools & Tech', link: '#tech' },
    { name: 'My Works', link: '#myWorks' },
    { name: 'My Projects', link: '#myProjects' },
    { name: 'My Hobby', link: '#myHobby' },
    { name: 'Hire Me', link: '#hire' },
]
const navLinkProjects = [
    { name: 'Home', link: '/' },
    { name: 'My Works', link: '#myWorks' },
    { name: 'My Projects', link: '#myProjects' },
    { name: 'My Hobby', link: '/Blossoms' },
]
const navLinkBlossoms = [
    { name: 'Home', link: '/' },
    { name: 'Projects', link: '/Projects' },
]
const navLinkOthers = [
    { name: 'Home', link: '/' },
    { name: 'Projects', link: '/Projects' },
    { name: 'Blossoms', link: '/Blossoms' },
]

const Navbar3 = ({ darkMode, setDarkMode, theme, setTheme }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [activeLink, setActiveLink] = useState(null)
    const [navLink, setNavLink] = useState(null)

    useEffect(() => {
        const pName = router.pathname
        if (pName === '/') {
            setNavLink(navLinkHome)
        } else if (pName === '/Blossoms') {
            setNavLink(navLinkBlossoms)
        } else if (pName === '/Projects') {
            setNavLink(navLinkProjects)
        } else {
            setNavLink(navLinkOthers)
        }
    }, [])
    function navigate(link) {
        setIsOpen(false)
        router.push(link)
    }

    function handelDialog() {
        setIsDialogOpen(false)
    }

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className={`fixed top-0 right-4 w-fit mt-2 z-50 rounded-full cursor-pointer text-2xl ${darkMode ? 'bg-blue-300' : 'bg-pink-300'}`} style={{ padding: '9px' }} area-labelledby='sideNavBar'>
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
                    style={darkMode ? { background: 'linear-gradient(#2C5364,#203A43,#0F2027)', boxShadow: '0px 0px 30px #6b7280' } : { background: 'linear-gradient(#D7DDE8,#BBD2C5)', boxShadow: '0px 0px 30px #374151' }}
                    className={`absolute top-0 right-0 bottom-0 rounded-l-2xl overflow-hidden ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}
                >
                    {navLink && <section className='w-full min-h-full px-4 flex items-center'>
                        <motion.div variants={ulVariants} animate={isOpen ? 'open' : 'closed'} className='min-w-full flex flex-col h-fit'>
                            <motion.h1 variants={liVariants} className='text-3xl lg:text-4xl mt-4 mb-4 lg:mb-12  ml-4'>
                                <span className='font-ubuntu'>useful</span>
                                <span className='font-ubuntu font-bold ml-2' style={{ color: theme.val }}>Links</span>
                            </motion.h1>
                            {navLink.map((curr, index) => {
                                return (
                                    <motion.div key={index} variants={liVariants} whileTap={{ scale: 0.88 }}>
                                        <Link href={curr.link}>
                                            <a onClick={() => setActiveLink(curr.name)} className='text-xl ml-4 mb-3 font-ubuntu flex items-center'>
                                                <span className='font-ubuntu'>{curr.name}</span>
                                                <BsBookmarkHeartFill className={activeLink === curr.name ? 'ml-4 text-2xl' : 'hidden'} style={{ color: theme.val }} />
                                            </a>
                                        </Link>
                                    </motion.div>
                                )
                            })}
                            <motion.div variants={liVariants} className='mt-4 ml-4'>
                                <h2>
                                    <span className='capitalize text-xl font-comicNeue'>Color Theme :</span>
                                    <span className='ml-2 capitalize text-xl font-comicNeue font-bold'>{darkMode ? 'Dark' : 'Lite'}</span>
                                </h2>
                                <h2 className='mt-2'>
                                    <span className='capitalize text-xl font-comicNeue'>Color Scheme :</span>
                                    <span className='ml-2 capitalize text-xl font-comicNeue' style={{ color: theme.val }}>{theme.name}</span>
                                </h2>
                            </motion.div>

                            <motion.div variants={liVariants} className='mt-8 flex flex-col items-center'>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className='flex w-full justify-center'
                                >
                                    <button onClick={() => setIsDialogOpen(true)} type='button' className='w-11/12 flex items-center justify-center border-0 py-2 px-8 focus:outline-none text-lg  transition-all rounded-full text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]'>
                                        <BsGearFill />
                                        <span className='ml-2'>Customize</span>
                                    </button>
                                </motion.div>
                                <Button onClick={() => navigate('/admin')} theme={theme} type='button' className='mt-8'>
                                    <div className='flex items-center justify-center'>
                                        <MdOutlineDashboardCustomize />
                                        <span className='ml-2'>Admin Dashboard</span>
                                    </div>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </section>}
                </motion.div>
            </motion.div>
            {isDialogOpen && <CustomizeModal visible={isDialogOpen} isClose={handelDialog} theme={theme} darkMode={darkMode} setTheme={setTheme} setDarkMode={setDarkMode} />}
        </>
    )
}

export default Navbar3