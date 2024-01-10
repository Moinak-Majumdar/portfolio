import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/legacy/image';
import { GiClick } from 'react-icons/gi'
import AnimatedHeading from '../tools/AnimatedHeading'
import { useFont } from '@/context/FontProvider';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const innerVariants: Variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 300 }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: { type: 'spring', stiffness: 300 }
    }
};
type T_data = { _id: string, name: string, type: string, role: string, intro: string, liveUrl: string, gitRepo: string, slug: string, description: string, img: string[], tools: string[], toolsLogo: string[], __v: number, status: string, cover: string }

const WebCard = ({ data }: { data: T_data }) => {

    const { comicNeue, roboto } = useFont();
    const darkMode = useSelector((s: RootState) => s.darkMode.mode);
    const theme = useSelector((s: RootState) => s.colorTheme);

    return (
        <Link href={`Web/${data.slug}`}>
            <motion.section variants={innerVariants} className='w-full h-fit group overflow-hidden border-slate-700 text-gray-300 hover:cursor-pointer rounded-tl-[40px] rounded-br-[40pX] border p-1' whileTap={{ scale: 0.95 }}>
                <div className='flex bg-gradient-to-b from-[#243B55] to-[#141E30] relative rounded-tl-[35px] rounded-br-[35px] overflow-hidden'>
                    <div className='min-w-full h-fit lg:group-hover:opacity-0 duration-500'>
                        {/* <picture>
                            <source srcSet={data.img[0]} />
                            <img alt='project.jpg' className='min-w-full min-h-[300px] md:min-h-[380px]' style={{ pointerEvents: 'none' }} layout='fill' loading='lazy' />
                        </picture> */}
                        <Image src={data.cover} width={786} height={650} layout='responsive' alt={`${data.name}-cover pic`} />
                        <div className='absolute bottom-4 left-3 px-4 py-2 rounded-tl-2xl rounded-br-2xl shadow-2xl shadow-black' style={{ backgroundColor: theme.val }}>
                            {/* <span className={`font-comicNeue capitalize text-xl xl:text-2xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{data.name}</span> */}
                            <AnimatedHeading color={darkMode ? 'rgb(229,231,235)' : 'rgb(31,41,45)'} classList='capitalize text-xl xl:text-2xl' title={data.name} />
                        </div>
                    </div>
                    <div className='absolute top-0 left-0 flex flex-col justify-start p-4 opacity-0 lg:group-hover:opacity-100 duration-500 h-full' style={roboto.style}>
                        <h2 className='text-4xl capitalize' style={comicNeue.style}>{data.name}</h2>
                        <p className='mt-4 text-lg'>{data.intro}</p>
                        <p className='mt-4 '>
                            <span className='font-bold'>Project Role</span>:
                            <span className='ml-2'>{data.role}</span>
                        </p>
                        <p className='mt-4'>
                            <span className='font-bold'>Current Status</span>:
                            <span className='ml-2'>{data.status}</span>
                        </p>
                        <div className='mt-auto flex items-center'>
                            <GiClick style={{ color: theme.val, fontSize: '20px' }} />
                            <span className='ml-2 text-lg'>Click to view full description</span>
                        </div>
                    </div>
                </div>
            </motion.section>
        </Link>
    )
}

export default WebCard