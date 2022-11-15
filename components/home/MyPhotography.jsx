import { motion } from 'framer-motion'
import Link from 'next/link';
import axios from "axios";
import Image from 'next/image';
import { useEffect, useState } from "react";
import PopupError from "../tools/PopupError";


const viewport = {
    once: false,
    amount: typeof window !== 'undefined' ? (window.innerWidth > 450 ? 0.5 : 0.1) : 0.5
}
const outerVariants = {
    open: {
        transition: { staggerChildren: 0.5, delayChildren: 0.3 }
    },
    closed: {
        transition: { staggerChildren: 0.5, staggerDirection: -1 }
    }
};
const innerVariants = {
    open: {
        x: 0,
        opacity: 1,
    },
    closed: {
        x: 200,
        opacity: 0,
    }
};
const Heading = {
    closed: {
        opacity: 0.5,
    },
    open: {
        opacity: 1,
        transition: {
            delay: 0.2
        }
    }
}

const MyPhotography = ({ darkMode, theme }) => {

    const [Photo, setPhoto] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [Error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        async function getPhoto() {
            const options = {
                method: 'GET',
                url: process.env.NEXT_PUBLIC_GET_ALL_PHOTOGRAPHY_API,
                params: {
                    apiKey: process.env.NEXT_PUBLIC_DB_KEY
                },
                headers: { 'Content-Type': 'application/json' }
            };

            await axios.request(options).then((response) => {
                const d = response.data
                const shuffled = d.sort(() => 0.5 - Math.random());
                setPhoto(shuffled.slice(0, 4))
            }).catch((error) => {
                const status = error.response.status;
                const data = error.response.data;
                const s = status.toString()
                if (s === '404' || s === '400') {
                    setError(data.error)
                    console.log(error);
                } else if (s === '420') {
                    setError(data.badRequest)
                    console.log(error);
                } else {
                    setError('Check Console')
                    console.log(Error)
                }
            }).then(() => {
                setLoading(false)
            });
        }
        getPhoto()
    }, [])

    if (Error) {
        return (
            <PopupError errors={Error} setErrors={setError} />
        )
    }

    return (
        <section id='myHobby' className='relative overflow-hidden'>
            <div className={`myContainer py-[5rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <motion.div initial='closed' whileInView='open' viewport={viewport} variants={outerVariants} className="flex flex-col justify-start">
                    <motion.div variants={Heading}>
                        <h4 className="font-ubuntu tracking-wide text-lg uppercase">Blossoms</h4>
                        <h1 className="text-4xl md:text-5xl mb-4 font-ubuntu">
                            <span className="font-ubuntu font-bold mr-2">Fragrance of</span>
                            my rooftop
                        </h1>
                        <p className='font-roboto text-lg mt-4 max-w-[35rem]'>Being a versatile person, I have a pretty large list of my pastimes. One of the ones I enjoy doing is gardening and clicking on good photos of those with my cell phone. <br />
                            My device - <a className='font-roboto font-bold' href='https://www.motorola.in/smartphones-motorola-one-macro/p' target='_blank'>Motorola One Macro</a>
                        </p>
                        <div className='mt-2'>
                            <Link href='/Blossoms'>
                                <a className='font-roboto text-xl font-bold' style={{ color: theme.val }}>View all blossoms</a>
                            </Link>
                        </div>
                    </motion.div>
                    <div>
                        {isLoading && <h1 className="text-center text-5xl mt-40"><span style={{ color: `${theme.val}` }}>Loading...</span></h1>}
                        {!Photo && <h1 className="text-center text-4xl mt-40"><span className="font-ubuntu font-bold" style={{ color: `${theme.val}` }}>Server Error:</span> Failed to fetch projects.</h1>}
                        {Photo && <div className="mt-4 mx-auto grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-fit">
                            {Photo.map((curr, index) => {
                                return (
                                    <motion.div variants={innerVariants} key={index} className='w-[270px] md:w-[360px] h-[360px] md:h-[480px] relative flex border border-slate-800  rounded-sm'>
                                        <Image src={curr.url} alt='myHobby.jpg' layout='fill' objFit='cover' className='rounded-sm' />
                                    </motion.div>
                                )
                            })}
                        </div>}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default MyPhotography