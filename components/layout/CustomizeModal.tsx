import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { BsMoonStarsFill, BsSunFill, } from 'react-icons/bs'
import { MdMonitor, MdClose } from 'react-icons/md'
import Button from '../tools/Button'
import ColorSetting from './ColorSetting'
import { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import darkModeSlice from '@/redux/slices/darkModeSlice'
import { useFont } from '@/context/FontProvider'

const dialogVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.5, },
        x: '0'
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1, delay: 1.5 },
        x: '-100vw'
    },
}
const liVariants = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100 
        }
    },
    closed: {
        x: 80,
        opacity: 0,
        transition: {
            type: 'spring', stiffness: 100
        }
    }
};

const mode = [
    { name: 'Lite', icon: <BsSunFill /> },
    { name: 'Dark', icon: <BsMoonStarsFill /> },
    { name: 'System', icon: <MdMonitor /> }
]

interface props {
    visible: boolean, isClose: () => void,
}

const CustomizeModal = ({ visible, isClose }: props) => {

    const [Visibility, setVisibility] = useState(visible)
    const [modeLight, setModeLight] = useState<string>()
    const { comicNeue, poppins, lato} = useFont()

    const dispatch = useDispatch<AppDispatch>()

    const theme = useSelector((s: RootState) => s.colorTheme)
    const darkMode = useSelector((s: RootState) => s.darkMode.mode)

    useEffect(() => {
        const storage = localStorage.getItem('theme')
        if (typeof storage === 'string') {
            const temp = JSON.parse(storage)
            const { KitMode } = temp
            setModeLight(KitMode)
        }
    },[])
    
    
    function changeVisibility() {
        setVisibility(false)
        setTimeout(() => {
            isClose()
        }, 1450)
    }

    function changeMode(params: string) {
        if (params === 'Lite') {
            document.body.style.backgroundColor = '#ffffff'
            setModeLight('Lite')
            dispatch(darkModeSlice.actions.setMode({mode: false, modeLite: 'Lite'}));
            localStorage.setItem('theme', JSON.stringify({ name: theme.name, val: theme.val, KitMode: 'Lite' }))
        }
        if (params === 'Dark') {
            document.body.style.backgroundColor = '#000011'
            setModeLight('Dark');
            dispatch(darkModeSlice.actions.setMode({mode: true, modeLite: 'Dark'}));
            localStorage.setItem('theme', JSON.stringify({ name: theme.name, val: theme.val, KitMode: 'Dark' }))
        }
        if (params === 'System') {
            setModeLight('System')
            const mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            document.body.style.backgroundColor = mode ? '#000011' : '#ffffff';
            dispatch(darkModeSlice.actions.setMode({mode, modeLite: 'System'}));
            localStorage.setItem('theme', JSON.stringify({ name: theme.name, val: theme.val, KitMode: 'System' }))
        }
    }

    
    return (
        <section className={`fixed top-0 left-0 min-h-screen min-w-[100vw] z-[60] flex flex-col justify-center items-center backdrop-blur-md p-6 ${visible ? 'flex flex-col' : 'hidden'}`}>
            <motion.div
                initial='closed' animate={Visibility ? 'open' : 'closed'}
                variants={dialogVariants}
                className={`p-4 max-w-lg rounded-xl backdrop:backdrop-blur-sm z-[65] flex flex-col bg-gradient-to-b ${darkMode ? 'from-[#294861] via-[#2a454b] to-[#0e1c26] text-slate-300' : 'from-[#e3e3e3] to-[#cad0ff] text-gray-700'}`}
            >
                <motion.h3 variants={liVariants} className={`${comicNeue.className} text-xl lg:text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Customize as per choice :</motion.h3>
                <motion.div variants={liVariants} className='text-sm lg:text-md mt-2 ml-4' style={lato.style}>
                    This website is built with both Light/Dark themes and various color schemes for user comfort and customization.
                </motion.div>
                <motion.h3 style={comicNeue.style} variants={liVariants} className={`mt-4 text-md lg:text-xl ${darkMode ? 'text-white' : 'text-black'}`}>Color Theme :</motion.h3>
                <motion.div variants={liVariants} className='flex gap-3 mt-2'>
                    {mode.map((curr, i) => {
                        return (
                            <motion.button key={`mode_button_${i}`} variants={liVariants} className={`px-2 md:px-4 py-2 w-fit flex items-center rounded-tl-3xl rounded-br-3xl text-lg ${poppins.className} ${curr.name === modeLight ? 'bg-slate-400/50' : ''}`} onClick={() => changeMode(curr.name)}>
                                {curr.icon}
                                <span className='ml-3'>{curr.name}</span>
                            </motion.button>
                        )
                    })}
                </motion.div>
                <motion.h3 style={{color: theme.val}} variants={liVariants} className={`mt-4 text-md lg:text-xl ${comicNeue.className}`}>Color Scheme :
                    <span className='ml-2' style={{ color: theme.val }}>{theme.name}</span>
                </motion.h3>
                <ColorSetting  variants={liVariants}/>
                <motion.div variants={liVariants} className='mx-auto'>
                    <Button onClick={changeVisibility}  type='button' className='mt-6'>
                        <div className='flex items-center justify-center'>
                            <MdClose />
                            <span className='ml-2' style={poppins.style}>close</span>
                        </div>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default CustomizeModal