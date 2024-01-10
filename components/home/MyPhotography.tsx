import { Variants, motion } from 'framer-motion'
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
import { TbReload } from 'react-icons/tb'
import Bg from '../tools/Bg';
import AnimatedHeading from '../tools/AnimatedHeading'
import PopupError from '../tools/PopupError';
import { useFont } from '@/context/FontProvider';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const outerVariants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.5 }},
    closed: { transition: { staggerChildren: 0.07, staggerDirection: -1 } }
};
const innerVariants: Variants = {
    open: { x: 0, y: 0, opacity: 1, transition: { type: 'spring', stiffness: 150 } },
    closed: { x: -200, y: 50, opacity: 0,}
};
const Heading = {
    closed: { opacity: 0.5,},
    open: { opacity: 1,  transition: { delay: 0.2, }}
}

type T_data = { _id: string, url: string, __v: number }


const MyPhotography = () => {

    const [data, setData] = useState<T_data[]>();
    const [Loading, setLoading] = useState<boolean>(true)
    const [Error, setError] = useState<string | null>(null)
    const { ubuntu, roboto } = useFont();
    const darkMode = useSelector((s: RootState) => s.darkMode.mode);
    const theme = useSelector((s: RootState) => s.colorTheme);

    useEffect(() => {
        setLoading(true)
        async function get() {
            await axios.post(`${process.env.NEXT_PUBLIC_API_MANAGER}/getAllPhotography`, { apiKey: process.env.NEXT_PUBLIC_DB_KEY }, { headers: { 'Content-Type': 'application/json' } }).then((response) => {
                setData(response.data.slice(0, 4))
                setLoading(false)
            }).catch((error) => {
                console.log(error)
                setLoading(true)
                setError('Something unexpected happens while fetching personal hobby data.')
            })
        }
        get()
    }, [])

    if (Error) {
        return (
            <PopupError errors={Error} setErrors={setError} />
        )
    }

    if (Loading) {
        return (
            <PhotographyLoader />
        )
    }

    return (
        <>
            <div className={`myContainer py-[5rem] ${ubuntu.className} ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <motion.div initial='closed' whileInView='open' viewport={{ once: true, amount: 0.3 }} variants={outerVariants} className="flex flex-col justify-start">
                    <motion.div variants={Heading}>
                        <AnimatedHeading classList="tracking-wide text-lg uppercase" font={ubuntu} title='Blossoms' />
                        <h1 className="text-4xl md:text-5xl mb-4">
                            <span className="font-bold mr-2">Fragrance of</span>
                            my rooftop
                        </h1>
                        <p style={roboto.style} className='text-lg mt-4 max-w-[35rem]'>Being a versatile person, I have a pretty large list of my pastimes. One of the ones I enjoy doing is gardening and clicking on good photos of those with my cell phone. <br />
                            My device - <a style={roboto.style} className='font-bold' href='https://www.motorola.in/smartphones-motorola-one-macro/p' target='_blank'>Motorola One Macro</a>
                        </p>
                        <div className='mt-2'>
                            <Link href='/Blossoms' className={`${roboto.className} text-xl font-semibold cursor-pointer`} style={{ color: theme.val }}>
                                View all blossoms
                            </Link>
                        </div>
                    </motion.div>
                    {data && <div className="mt-4 mx-auto grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-fit">
                        {data.map((curr, index) => {
                            return (
                                <motion.div variants={innerVariants} key={index} className='noSelection w-fit h-fit relative flex p-1 border border-slate-800 rounded-sm'>
                                    <Image src={curr.url} height='480' width='360' alt='myHobby.png' className='rounded-sm lg:hover:scale-[1.03] duration-500' placeholder='blur' blurDataURL='/assets/image/imgPlaceholder.jpg' />
                                </motion.div>
                            )
                        })}
                    </div>}
                </motion.div>
            </div>
            {/* background */}
            <div className="absolute w-full h-full md:w-1/3 top-0 left-0 -z-10">
                <div className={`absolute w-full h-full inset-0 bg-gradient-to-l z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
                <Bg
                    alt="landing pattern"
                    src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
                    className="opacity-80"
                />
                <div className={`absolute w-full h-full inset-0 bg-gradient-to-t z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
            </div>
        </>
    )
}


const PhotographyLoader = () => {
    const { ubuntu, roboto } = useFont();
    const darkMode = useSelector((s: RootState) => s.darkMode.mode);
    const theme = useSelector((s: RootState) => s.colorTheme);

    return (
        <>
            <div className={`myContainer py-[5rem] ${ubuntu.className} ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <div className="flex flex-col justify-start">
                    <h1 className="text-4xl md:text-5xl mb-4">
                        <span style={ubuntu.style} className="font-bold mr-2">Fragrance of</span>
                        my rooftop
                    </h1>
                    <p style={roboto.style} className='text-lg mt-4 max-w-[35rem]'>Being a versatile person, I have a pretty large list of my pastimes. One of the ones I enjoy doing is gardening and clicking on good photos of those with my cell phone. <br />
                        My device - <a className='font-bold' style={ubuntu.style} href='https://www.motorola.in/smartphones-motorola-one-macro/p' target='_blank'>Motorola One Macro</a>
                    </p>
                    <div className='mt-2'>
                        <Link href='/Blossoms' className={`${roboto.className} text-xl font-semibold cursor-pointer`} style={{ color: theme.val }}>
                            View all blossoms
                        </Link>
                    </div>
                    <motion.div className='mt-40 mx-auto text-4xl' initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8 }}>
                        <TbReload />
                    </motion.div>
                    <h1 className="text-center text-2xl mt-4" style={ubuntu.style}>
                        <span className={`${roboto.className} font-bold mr-2`} style={{ color: theme.val }}>Loading :</span>Please wait until data being fetched 🥰.
                    </h1>
                </div>
            </div>
            {/* background */}
            <div className="absolute w-full h-full md:w-1/3 top-0 left-0 -z-10">
                <div className={`absolute w-full h-full inset-0 bg-gradient-to-l z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
                <Bg
                    alt="landing pattern"
                    src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
                    className="opacity-100"
                />
                <div className={`absolute w-full h-full inset-0 bg-gradient-to-t z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
            </div>
        </>
    )
}

export default MyPhotography