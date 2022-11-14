import { motion } from 'framer-motion'
import Link from 'next/link';
import axios from "axios";
import Image from 'next/image';
import { useEffect, useState } from "react";
import PopupError from "../tools/PopupError";

const Left = {
    closed: {
        x: 0,
        y: 0,
        opacity: 0.1,
    },
    open: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            duration: 1
        }
    }
}

const Heading = {
    closed: {
        opacity: 0.5,
    },
    open: {
        opacity: 1,
        transition: {
            delay: 0.5
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
                const shuffled = [...response.data].sort(() => 0.5 - Math.random());
                const arr = shuffled.slice(0, 4)
                setPhoto([...arr])
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
                <div className="flex flex-col justify-start">
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
                                <a className='font-roboto text-xl font-bold' style={{color: theme.val}}>View all blossoms</a>
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div variants={Left}>
                        {isLoading && <h1 className="text-center text-5xl mt-40"><span style={{ color: `${theme.val}` }}>Loading...</span></h1>}
                        {!Photo && <h1 className="text-center text-4xl mt-40"><span className="font-ubuntu font-bold" style={{ color: `${theme.val}` }}>Server Error:</span> Failed to fetch projects.</h1>}
                        {Photo && <div className="mt-4 mx-auto grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-fit">
                            {Photo.map((curr, index) => {
                                return (
                                    <div key={index} className='w-fit h-fit relative flex p-1 border border-slate-800 rounded-sm'>
                                        <Image src={curr.url} height='395px' width='300px' alt='myHobby.png' className='rounded-sm' />
                                    </div>
                                )
                            })}
                        </div>}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default MyPhotography