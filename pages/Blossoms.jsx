import { motion } from 'framer-motion'
import axios from "axios";
import Image from 'next/image';
import Footer from '../components/layout/Footer'

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
        y: 0,
        opacity: 1,
    },
    closed: {
        x: 200,
        y: -50,
        opacity: 0,
    }
};
const Heading = {
    closed: {
        opacity: 0.5,
        y: -200,
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.2
        }
    }
}

const Blossoms = ({ darkMode, theme, key, photo }) => {
    return (
        <>
            <section key={key} id='myHobby' className='relative overflow-hidden'>
                <div className={`myContainer py-[5rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    <motion.div variants={outerVariants} initial='closed' animate='open' className="flex flex-col justify-start">
                        <motion.div variants={Heading}>
                            <h4 className="font-ubuntu tracking-wide text-lg uppercase">Blossoms</h4>
                            <h1 className="text-4xl md:text-5xl mb-4 font-ubuntu">
                                <span className="font-ubuntu font-bold mr-2">Fragrance of</span>
                                my rooftop
                            </h1>
                            <p className='font-roboto text-lg mt-4 max-w-[35rem]'>Being a versatile person, I have a pretty large list of my pastimes. One of the ones I enjoy doing is gardening and clicking on good photos of those with my cell phone. <br />
                                My device - <a className='font-roboto font-bold' href='https://www.motorola.in/smartphones-motorola-one-macro/p' target='_blank' style={{ color: theme.val }}>Motorola One Macro</a>
                            </p>
                        </motion.div>
                        <div>
                            {photo && <div className="mt-4 mx-auto grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-fit">
                                {photo.map((curr, index) => {
                                    return (
                                        <motion.div variants={innerVariants} key={index} className='w-fit h-fit relative flex p-1 border border-slate-800 rounded-sm overflow-hidden'>
                                            <Image src={curr.url} height='480px' width='360px' alt='myHobby.png' className='rounded-sm lg:hover:scale-[1.03] duration-500' />
                                        </motion.div>
                                    )
                                })}
                            </div>}
                        </div>
                    </motion.div>
                </div>
            </section>
            <Footer key={'footer'} darkMode={darkMode} />
        </>
    )
}

export async function getServerSideProps() {
    let photo = null
    const options = {
        method: 'GET',
        url: process.env.NEXT_PUBLIC_GET_ALL_PHOTOGRAPHY_API,
        params: {
            apiKey: process.env.NEXT_PUBLIC_DB_KEY
        },
        headers: { 'Content-Type': 'application/json' }
    };
    await axios.request(options).then((response) => {
        photo = response.data
    }).catch((error) => {
        console.log(error);
    });

    return { props: { photo : photo } }
}

export default Blossoms