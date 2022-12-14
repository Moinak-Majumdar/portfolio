import { motion } from 'framer-motion'
import Link from 'next/link'
import { GiClick } from 'react-icons/gi'

const innerVariants = {
    open: {
        x: 0,
        y: 0,
        opacity: 1,
    },
    closed: {
        x: 200,
        y: -10,
        opacity: 0,
    }
};
const DocCard = ({ theme, darkMode, data }) => {

    return (
        <Link href={`Doc/${data.name}`}>
            <motion.a variants={innerVariants} className='w-full h-fit group overflow-hidden border p-2 border-slate-800 text-gray-300 hover:cursor-pointer' whileTap={{scale: 0.95}}>
                <div className='flex bg-gradient-to-b from-[#243B55] to-[#141E30] relative'>
                    <div className='min-w-full h-fit lg:group-hover:opacity-0 duration-500'>
                        <picture>
                            <source srcSet={data.img[0]} />
                            <img alt='project.jpg' className='min-w-full min-h-[300px] md:min-h-[380px]' style={{ pointerEvents: 'none' }} layout='fill' loading='lazy' />
                        </picture>
                        <div className='absolute bottom-4 left-1 px-4 py-2 rounded-full' style={{ backgroundColor: theme.val }}>
                            <span className={`font-comicNeue capitalize text-2xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{data.name}</span>
                        </div>
                    </div>
                    <div className='absolute top-0 left-0 flex flex-col justify-start p-4 opacity-0 lg:group-hover:opacity-100 duration-500 h-full'>
                        <h2 className='text-4xl font-comicNeue capitalize'>{data.name}</h2>
                        <p className='mt-4 text-xl'>{data.intro}</p>
                        <p className='mt-4 text-lg'>
                            <span className='font-roboto font-bold'>Project Role</span>:
                            <span className='ml-2'>{data.role}</span>
                        </p>
                        <p className='mt-4 text-lg'>
                            <span className='font-roboto font-bold'>Current Status</span>:
                            <span className='ml-2'>{data.status}</span>
                        </p>
                        <div className='mt-auto flex items-center'>
                            <GiClick style={{ color: theme.val, fontSize: '20px' }} />
                            <span className='ml-2 font-roboto text-lg'>Click to view full description</span>
                        </div>
                    </div>
                </div>
            </motion.a>
        </Link>
    )
}

export default DocCard