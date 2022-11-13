import { motion } from 'framer-motion'
import Image from 'next/image'
import Bg from '../tools/Bg'
import { IoDesktopOutline, IoBrush, IoServerSharp } from 'react-icons/io5'
import { AiFillApi, AiFillSetting } from 'react-icons/ai'
import { FiPackage } from 'react-icons/fi'

const Left = {
    closed: {
        x: -80,
        opacity: 0.1,
    },
    open: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            delay: 0.3
        }
    }
}

const Heading = {
    closed: {
        x: 80,
        opacity: 0.1,
    },
    open: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            delay: 0.3
        }
    }
}

const compo = [
    {
        name: 'Frontend Development',
        tools: 'HTML, CSS, JavaScript, Tailwind Css, React.js, Next.js',
        logo: <IoDesktopOutline />
    },
    {
        name: 'Backend Development',
        tools: 'PHP, Node.js, Express.js, REST APIs',
        logo: <AiFillApi />
    },
    {
        name: 'Designing and Editing',
        tools: 'Figma, Canva',
        logo: <IoBrush />
    },
    {
        name: 'Database',
        tools: 'Mongo Db, MySQL',
        logo: <IoServerSharp />
    },
    {
        name: 'Tech Stack',
        tools: 'MERN stack, JAM stack',
        logo: <FiPackage />
    },
    {
        name: 'Others',
        tools: 'Firebase, Vercel, Netlify, Heroku',
        logo: <AiFillSetting />
    }
]

const Tech = ({ darkMode, theme, key }) => {
    return (
        <section key={key} id='tech' className={`relative ${darkMode ? 'bg-gradient-to-b from-slate-900' : ''}`}>
            <div className={`myContainer py-[4rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-between">
                    <motion.div variants={Heading} className='flex items-center'>
                        <Image src='/assets/image/tools2.png' height={600} width={800} alt='image.png' />
                    </motion.div>
                    <motion.div variants={Left} className='flex flex-col mt-10 lg:mt-0 w-full lg:w-1/2'>
                        <h4 className="font-ubuntu tracking-wide text-lg">TOOLS & TECH</h4>
                        <h1 className="text-4xl md:text-5xl mb-4 font-ubuntu">
                            My Personal<span className="font-ubuntu font-bold ml-2">Favorites</span>
                        </h1>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-8 w-full mx-auto md:mx-0 mt-4'>
                            {compo.map((curr, index) => {
                                return (
                                    <div key={index} className='flex flex-col w-40 md:w-32 '>
                                        <h1 className='text-3xl' style={{ color: `${theme.val}` }}>{curr.logo}</h1>
                                        <h2 className='text-xl font-ubuntu font-bold'>{curr.name}</h2>
                                        <p className='mt-4 font-comicNeue'>{curr.tools}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className="absolute w-full md:w-1/2 h-full top-0 right-0  -z-10">
                <div className={`absolute w-full h-full inset-0 bg-gradient-to-b z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
                <Bg
                    alt="landing pattern"
                    src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
                    className="opacity-100"
                />
                <div className={`absolute w-full h-full inset-0 bg-gradient-to-l z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
            </div>
        </section>
    )
}

export default Tech