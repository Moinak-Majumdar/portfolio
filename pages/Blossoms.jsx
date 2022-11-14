import { motion } from 'framer-motion'
import axios from "axios";
import Image from 'next/image';

const Left = {
    closed: {
        x: 50,
        y: 50,
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

const Blossoms = ({ darkMode, theme, key, photo }) => {

    return (
        <section key={key} id='myHobby' className='relative overflow-hidden'>
            <div className={`myContainer py-[5rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <div className="flex flex-col justify-start">
                    <motion.div variants={Heading}>
                        <h4 className="font-ubuntu tracking-wide text-lg uppercase">Blossoms</h4>
                        <h1 className="text-4xl md:text-5xl mb-4 font-ubuntu">
                            <span className="font-ubuntu font-bold mr-2">Fragrance of</span>
                            my rooftop
                        </h1>
                        <p className='font-roboto text-lg mt-4 max-w-[35rem]'>Being a versatile person, I have a pretty large list of my pastimes. One of the ones I enjoy doing is gardening and clicking on good photos of those with my cell phone. <br />
                            My device - <a className='font-roboto font-bold' href='https://www.motorola.in/smartphones-motorola-one-macro/p' target='_blank' style={{color: theme.val}}>Motorola One Macro</a>
                        </p>
                    </motion.div>
                    <motion.div variants={Left}>
                        {photo && <div className="mt-4 mx-auto grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-fit">
                            {photo.map((curr, index) => {
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

export async function getServerSideProps() {
    let photo = []
    const options = {
        method: 'GET',
        url: process.env.NEXT_PUBLIC_GET_ALL_PHOTOGRAPHY_API,
        params: {
            apiKey: process.env.NEXT_PUBLIC_DB_KEY
        },
        headers: { 'Content-Type': 'application/json' }
    };

    await axios.request(options).then((response) => {
        photo = [...response.data]
    }).catch((error) => {
        console.error(error);
    });

    return { props: { photo: photo } }
}

export default Blossoms