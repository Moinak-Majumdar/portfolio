import { motion } from 'framer-motion'
import axios from "axios";

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
        y: -50,
        x: -50,
    },
    open: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            delay: 0.2
        }
    }
}

const Blossoms = ({ darkMode, theme, key, photo }) => {

    return (
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
                        {photo && <div className="mt-4 mx-auto grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-fit">
                            {photo.map((curr, index) => {
                                return (
                                    <motion.div variants={innerVariants} key={index} className='w-fit h-fit relative flex p-1 border border-slate-800 rounded-sm'>
                                        <picture>
                                            <source srcSet={curr.url} />
                                            <img alt='myHobby.jpg' className='min-w-full min-h-[395px] md:min-h-[300px]' style={{ pointerEvents: 'none' }} layout='fill' loading='lazy'/>
                                        </picture>
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