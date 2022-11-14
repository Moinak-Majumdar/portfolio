import { useState } from 'react'
import { useRouter } from 'next/router'
import { BsMoonStarsFill, BsSunFill, BsBookmarkHeartFill } from 'react-icons/bs'
import { CgMenuRight } from 'react-icons/cg'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import Button from '../tools/Button'
import { motion } from 'framer-motion'
import ThemeMotion from './ThemeMotion'

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
        transition: { delay: 1.4 }
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
            y: { stiffness: 1000, velocity: -100 }
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

const themes = [
    { themeName: 'slate', themeColor: '#64748b' },
    { themeName: 'orange', themeColor: '#f97316' },
    { themeName: 'yellow', themeColor: '#eab308' },
    { themeName: 'green', themeColor: '#22c55e' },
    { themeName: 'teal', themeColor: '#2dd4bf' },
    { themeName: 'cyan', themeColor: '#22d3ee' },
    { themeName: 'sky', themeColor: '#0ea5e9' },
    { themeName: 'blue', themeColor: '#3b82f6' },
    { themeName: 'indigo', themeColor: '#6366f1' },
    { themeName: 'purple', themeColor: '#a855f7' },
    { themeName: 'pink', themeColor: '#ec4899' },
    { themeName: 'red', themeColor: '#ef4444' },
]

const navLink = [
    { name: 'Intro', link: '#intro' },
    { name: 'About Me', link: '#aboutMe' },
    { name: 'Tools & Tech', link: '#tech' },
    { name: 'My Works', link: '#myWorks' },
    { name: 'My Projects', link: '#myProjects' },
    { name: 'Hire Me', link: '#hire' }
]

const Navbar3 = ({ darkMode, setDarkMode, theme, setTheme }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [activeLink, setActiveLink] = useState(null)


    function navigate(link) {
        setIsOpen(false)
        router.push(link)
    }

    function changeMode(params) {
        if (params === 'lite') {
            localStorage.setItem('darkMode', JSON.stringify(false))
            document.body.style.backgroundColor = '#ffffff'
            setDarkMode(false)
        }
        if (params === 'dark') {
            document.body.style.backgroundColor = '#000011'
            localStorage.setItem('darkMode', JSON.stringify(true))
            setDarkMode(true)
        }
    }
    return (
        <>
            <div className='fixed top-0 right-4 w-fit mt-2 rounded-full overflow-hidden z-50'>
                {!darkMode && <button onClick={() => changeMode('dark')} className='cursor-pointer rounded-full mr-2 bg-yellow-400 p-3'>
                    <BsSunFill className='text-xl' onClick={() => changeMode('dark')} />
                </button>}
                {darkMode && <button onClick={() => changeMode('lite')} className='cursor-pointer rounded-full mr-2 p-3 bg-slate-700'>
                    <BsMoonStarsFill className='text-xl text-blue-300' onClick={() => changeMode('lite')} />
                </button>}
                <button onClick={() => setIsOpen(!isOpen)} className={`rounded-full cursor-pointer text-2xl ${darkMode ? 'bg-blue-300' : 'bg-pink-300'}`} style={{ padding: '9px' }}>
                    <CgMenuRight className={darkMode ? 'text-black' : 'text-pink-800'} />
                </button>
            </div>
            {/* hl3 side navbar */}
            <motion.div
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                className={`z-40 fixed top-0 right-0 min-h-full flex ${isOpen ? "w-full" : 'max-w-0'}`}
            >
                <div onClick={() => setIsOpen(!isOpen)} className='bg-transparent min-w-full min-h-full'></div>
                <motion.div
                    variants={divVariants}
                    style={darkMode ? { background: 'linear-gradient(#2C5364,#203A43,#0F2027)', boxShadow: '0px 0px 30px #6b7280' } : { background: 'linear-gradient(#D7DDE8,#BBD2C5)', boxShadow: '0px 0px 30px #374151' }}
                    className={`absolute top-0 right-0 bottom-0 rounded-l-2xl overflow-hidden ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}
                >
                    <section className='w-full min-h-full px-4 flex items-center'>
                        <motion.div variants={ulVariants} animate={isOpen ? 'open' : 'closed'} className='min-w-full flex flex-col h-fit'>
                            {navLink.map((curr, index) => {
                                return (
                                    <motion.a key={index} variants={liVariants} href={curr.link} onClick={() => setActiveLink(curr.name)} whileTap={{ scale: 0.88 }} className='text-2xl ml-4 mb-4 font-ubuntu flex items-center'>
                                        <span className='font-ubuntu'>{curr.name}</span>
                                        <BsBookmarkHeartFill className={activeLink === curr.name ? 'ml-4 text-3xl' : 'hidden'} style={{color: theme.val}}/>
                                    </motion.a>
                                )
                            })}
                            <motion.div variants={liVariants} className='text-lg mt-10 font-comicNeue ml-4'>
                                This website is built with various color themes. Try by changing following color themes. 🌈
                            </motion.div>
                            <motion.div variants={liVariants} className='mt-4 ml-4'>
                                <span className='capitalize text-xl font-comicNeue'>Current Theme :</span>
                                <span className='ml-2 capitalize text-xl font-comicNeue' style={{color: theme.val}}>{theme.name}</span>
                            </motion.div>
                            <div className='w-fit grid grid-cols-4 mt-4 gap-3 mx-auto'>
                                {themes.map((curr, index) => {
                                    return (
                                        <ThemeMotion key={index} setTheme={setTheme} variants={liVariants}
                                            themeName={curr.themeName} themeColor={curr.themeColor} />
                                    )
                                })}
                            </div>
                            <motion.div variants={liVariants} className='mt-8'>
                                <Button onClick={() => navigate('/admin')} theme={theme} type='button'>
                                    <div className='flex items-center justify-center'>
                                        <MdOutlineDashboardCustomize />
                                        <span className='ml-2'>Admin Dashboard</span>
                                    </div>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </section>
                </motion.div>
            </motion.div>
        </>
    )
}

export default Navbar3