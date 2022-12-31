import { motion } from 'framer-motion'
import { useState } from 'react'
import { BsMoonStarsFill, BsSunFill, } from 'react-icons/bs'
import { MdOutlineDashboardCustomize, MdMonitor, MdClose } from 'react-icons/md'
import ThemeMotion from '../layout/ThemeMotion'
import Button from '../tools/Button'

const dialogVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.5 },
        x: '0'
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1, delay: 1.5 },
        x: '-100vw'
    }
}
const liVariants = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            x: { stiffness: 1000 }
        }
    },
    closed: {
        x: 80,
        opacity: 0,
        transition: {
            x: { stiffness: 1000 }
        }
    }
};

const mode = [
    { name: 'Lite', icon: <BsSunFill /> },
    { name: 'Dark', icon: <BsMoonStarsFill /> },
    { name: 'System', icon: <MdMonitor /> }
]

const themes = [
    { themeName: 'teal', themeColor: '#2dd4bf' },
    { themeName: 'cyan', themeColor: '#22d3ee' },
    { themeName: 'yellow', themeColor: '#eab308' },
    { themeName: 'green', themeColor: '#22c55e' },
    { themeName: 'sky', themeColor: '#0ea5e9' },
    { themeName: 'pink', themeColor: '#ec4899' },
    { themeName: 'orange', themeColor: '#f97316' },
    { themeName: 'red', themeColor: '#ef4444' },
    { themeName: 'purple', themeColor: '#a855f7' },
    { themeName: 'blue', themeColor: '#3b82f6' },
    { themeName: 'indigo', themeColor: '#6366f1' },
    { themeName: 'slate', themeColor: '#64748b' },
]

const CustomizeModal = ({ visible, isClose, darkMode, setDarkMode, theme, setTheme }) => {

    const [Visibility, setVisibility] = useState(visible)
    const [modeLite, setModeLite] = useState('System')

    function changeVisibility() {
        setVisibility(false)
        setTimeout(() => {
            isClose()
        }, 1550)
    }

    function changeMode(params) {
        if (params === 'Lite') {
            document.body.style.backgroundColor = '#ffffff'
            setModeLite('Lite')
            setDarkMode(false)
        }
        if (params === 'Dark') {
            document.body.style.backgroundColor = '#000011'
            setModeLite('Dark')
            setDarkMode(true)
        }
        if (params === 'System') {
            setModeLite('System')
            const mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            document.body.style.backgroundColor = mode ? '#000011' : '#ffffff'
            setDarkMode(mode)
        }
    }


    return (
        <section className={`fixed top-0 left-0 min-h-screen min-w-[100vw] z-[60] justify-center items-center backdrop-blur-md p-6 ${visible ? 'flex' : 'hidden'}`}>
            <motion.div
                initial='closed' animate={Visibility ? 'open' : 'closed'}
                variants={dialogVariants}
                className={`p-4 max-w-lg rounded-md backdrop:backdrop-blur-sm z-[65] flex flex-col bg-gradient-to-b ${darkMode ? 'from-[#2C5364] via-[#203A43] to-[#0F2027] text-slate-300' : 'from-[#D7DDE8] to-[#BBD2C5] text-gray-700'}`}
            >
                <motion.h3 variants={liVariants} className={`font-comicNeue text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Customize as per choice :</motion.h3>
                <motion.div variants={liVariants} className='text-lg mt-2 font-comicNeue ml-4'>
                    This website is built with both Light/Dark themes and various color schemes for user comfort and customization.
                </motion.div>
                <motion.h3 variants={liVariants} className={`mt-4 text-xl ${darkMode ? 'text-white' : 'text-black'}`}>Color Theme :</motion.h3>
                <motion.div variants={liVariants} className='flex gap-3 mt-2'>
                    {mode.map((curr, i) => {
                        return (
                            <motion.button key={`mode_button_${i}`} variants={liVariants} className={`px-2 md:px-4 py-2 w-fit flex items-center rounded-sm text-lg border-b border-slate-500 ${curr.name === modeLite ? 'bg-slate-400/50' : ''}`} onClick={() => changeMode(curr.name)}>
                                {curr.icon}
                                <span className='ml-3'>{curr.name}</span>
                            </motion.button>
                        )
                    })}
                </motion.div>
                <motion.h3 variants={liVariants} className={`mt-4 text-xl ${darkMode ? 'text-white' : 'text-black'}`}>Color Scheme :
                    <span className='ml-2 capitalize' style={{ color: theme.val }}>{theme.name}</span>
                </motion.h3>
                <div className='w-fit grid grid-cols-4 md:grid-cols-6 mt-4 gap-3 mx-auto'>
                    {themes.map((curr, index) => {
                        return (
                            <ThemeMotion key={index} setTheme={setTheme} variants={liVariants}
                                themeName={curr.themeName} themeColor={curr.themeColor} />
                        )
                    })}
                </div>
                <motion.div variants={liVariants} className='mx-auto'>
                    <Button onClick={changeVisibility} theme={theme} type='button' className='mt-6'>
                        <div className='flex items-center justify-center'>
                            <MdClose />
                            <span className='ml-2'>close</span>
                        </div>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default CustomizeModal