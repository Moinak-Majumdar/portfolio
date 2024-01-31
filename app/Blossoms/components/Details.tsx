'use client'

import AnimatedHeading from "@/app/components/others/AnimatedHeading";
import { useAppTheme } from "@/app/components/theme/AppTheme";
import { motion } from "framer-motion"
import Image from "next/legacy/image";
import Link from "next/link";


const outerVariants = {
    open: { transition: { staggerChildren: 0.5, delayChildren: 0.3, delay: 0.2 } },
    closed: { transition: { staggerChildren: 0.5, staggerDirection: -1 } }
};
const innerVariants = {
    open: { y: 0, x: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 150 } },
    closed: { y: 100, x: -200, opacity: 0, scale: 1.1 }
};
type T_photography = { id: string, url: string, __v: Number }

const Details = ({ photo }: { photo: T_photography[] }) => {

    const { ubuntu, roboto, themeColor } = useAppTheme();

    return (
        <motion.div variants={outerVariants} viewport={{ once: true}} initial='closed' whileInView='open' className="flex flex-col justify-start">
            <div>
                <AnimatedHeading classList="tracking-wide text-lg uppercase" font={ubuntu} title='Blossoms' />
                <h1 className="text-4xl md:text-5xl mb-4" style={ubuntu.style}>
                    <span className="font-bold mr-2">Fragrance of</span>
                    my rooftop
                </h1>
                <p style={roboto.style} className='text-lg mt-4 max-w-[35rem]'>Being a versatile person, I have a pretty large list of my pastimes. One of the ones I enjoy doing is gardening and clicking on good photos of those with my cell phone. <br />
                    My device - <Link className='font-bold' href='https://www.motorola.in/smartphones-motorola-one-macro/p' style={{ color: themeColor }}>Motorola One Macro</Link>
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
            </div>
        </motion.div>
    )
}




export default Details