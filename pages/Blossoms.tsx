import { motion } from 'framer-motion'
import axios from "axios";
import Image from 'next/legacy/image';
import Head from 'next/head';
import Footer from '../components/layout/Footer'
import AnimatedHeading from '../components/tools/AnimatedHeading'
import Bg from '@/components/tools/Bg';
import { useFont } from '@/context/FontProvider';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PopupError from '@/components/tools/PopupError';
import DevFlag from '@/components/others/DevFlag';

const outerVariants = {
    open: { transition: { staggerChildren: 0.5, delayChildren: 0.3, delay: 0.2 } },
    closed: { transition: { staggerChildren: 0.5, staggerDirection: -1 } }
};
const innerVariants = {
    open: { y: 0, x: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 150 } },
    closed: { y: 100, x: -200, opacity: 0, scale: 1.1 }
};
type T_photography = { id: string, url: string, __v: Number }
interface props { photo: T_photography[] | null }
const Blossoms = ({ photo }: props) => {

    const [Error, setError] = useState<string | null>('Something unexpected happens while fetching personal hobby data.')
    const { ubuntu, roboto } = useFont();
    const darkMode = useSelector((s: RootState) => s.darkMode.mode);
    const theme = useSelector((s: RootState) => s.colorTheme);
    const router = useRouter();

    const devFlag:boolean = process.env.NEXT_PUBLIC_DEV_FLAG == 'yes' ? true : false;


    if (Error == null) {
        router.replace('/500');
    }

    return (
        <>
            {devFlag && <DevFlag />}
            <Head>
                <meta property='og:title' content='Moinak Majumdar | Blossoms' />
                <title>Moinak Majumdar | Blossoms</title>
            </Head>
            <section id='myHobby' className='relative overflow-hidden'>
                <div className={`myContainer py-[5rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    <motion.div variants={outerVariants} viewport={{ once: true, amount: 0.2 }} initial='closed' animate='open' className="flex flex-col justify-start">
                        <div>
                            <AnimatedHeading classList="tracking-wide text-lg uppercase" font={ubuntu} title='Blossoms' />
                            <h1 className="text-4xl md:text-5xl mb-4" style={ubuntu.style}>
                                <span className="font-bold mr-2">Fragrance of</span>
                                my rooftop
                            </h1>
                            <p style={roboto.style} className='text-lg mt-4 max-w-[35rem]'>Being a versatile person, I have a pretty large list of my pastimes. One of the ones I enjoy doing is gardening and clicking on good photos of those with my cell phone. <br />
                                My device - <a className='font-bold' href='https://www.motorola.in/smartphones-motorola-one-macro/p' target='_blank' style={{ color: theme.val }}>Motorola One Macro</a>
                            </p>
                        </div>
                        <div>
                            {photo && <div className="mt-4 mx-auto grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-fit">
                                {photo.map((curr, index) => {
                                    return (
                                        <motion.div variants={innerVariants} key={index} className='noSelection w-fit h-fit relative flex p-1 border border-slate-800 rounded-sm overflow-hidden'>
                                            <Image src={curr.url} height='480' width='360' alt='myHobby.png' className='rounded-sm lg:hover:scale-[1.03] duration-500' placeholder='blur' blurDataURL='/assets/image/imgPlaceholder.jpg' />
                                        </motion.div>
                                    )
                                })}
                            </div>}
                            {!photo && Error && <PopupError errors={Error} setErrors={setError} />}
                        </div>
                    </motion.div>
                </div>
                <div className="absolute w-full lg:w-1/2 h-full top-0 left-0 -z-10">
                    <Bg
                        alt="landing pattern"
                        src={darkMode ? '/assets/svg/body-dark.svg' : '/assets/svg/body-lite.svg'}
                        className="opacity-100"
                    />
                    <div className={`absolute w-full h-full inset-0 bg-gradient-to-l z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
                </div>
                <Footer />
            </section>
        </>
    )
}


export async function getServerSideProps() {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_MANAGER}/getAllPhotography`, { apiKey: process.env.NEXT_PUBLIC_DB_KEY }, { headers: { 'Content-Type': 'application/json' } });
        const data: T_photography[] = response.data;
        return { props: { photo: data } }
    } catch (error) {
        console.log('fetch error')
        return { props: { photo: null } }
    }
}
export default Blossoms