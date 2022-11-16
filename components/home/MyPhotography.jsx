import { motion } from 'framer-motion'
import Link from 'next/link';
import Image from 'next/image';

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

const MyPhotography = ({ darkMode, theme, Hobby }) => {

    return (
        <section id='myHobby' className='relative overflow-hidden'>
            <div className={`myContainer py-[5rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <motion.div initial='closed' whileInView='open' viewport={{once: false, amount: 0.1}} variants={outerVariants} className="flex flex-col justify-start">
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
                        {!Hobby && <h1 className="text-center text-4xl mt-40"><span className="font-ubuntu font-bold" style={{ color: `${theme.val}` }}>Server Error:</span> Failed to fetch images.</h1>}
                        {Hobby && <div className="mt-4 mx-auto grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-fit">
                            {Hobby.map((curr, index) => {
                                return (
                                    <motion.div variants={innerVariants} key={index} className='w-fit h-fit relative flex p-1 border border-slate-800 rounded-sm'>
                                        <Image src={curr.url} height='480px' width='360px' alt='myHobby.png' className='rounded-sm' />
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