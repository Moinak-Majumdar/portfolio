'use client'

import { Variants, motion } from "framer-motion";
import Image from 'next/legacy/image';
import Link from "next/link";
import AnimatedHeading from "./AnimatedHeading";
import cardStyle from '@/app/css/WebCard2.module.css'
import { CSSProperties, useState, useEffect } from "react";
import { useAppTheme } from "../theme/AppTheme";
import { useTheme } from "next-themes";

const outerVariants: Variants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2, delay: .4 } },
    closed: { transition: { staggerChildren: 0.07, staggerDirection: -1 } }
};
const innerVariants: Variants = {
    open: { y: 0, opacity: 1, transition: { type: 'linear', stiffness: 300 } },
    closed: { y: 50, opacity: 0, transition: { type: 'linear', stiffness: 300 } }
};

type T_data = { _id: string, name: string, type: string, role: string, intro: string, liveUrl: string, gitRepo: string, slug: string, description: string, img: string[], tools: string[], toolsLogo: string[], __v: number, status: string, cover: string }

const WebProjectCard = ({ data }: { data: T_data }) => {
    const { comicNeue, poppins, ubuntu, themeColor } = useAppTheme();
    const [webCardCss, setWebCardCss] = useState<string>();
    const {resolvedTheme} = useTheme();

    useEffect(() => {
        resolvedTheme === 'dark' ? setWebCardCss(cardStyle.darkWebCard2) : setWebCardCss(cardStyle.lightWebCard2);
    }, [resolvedTheme])

    return (
        <Link href={`Web/${data.slug}`} className="relative">
            <motion.section className="relative group" whileTap={{ scale: 0.9 }}>
                <div className="translate-x-0 translate-y-0 grayscale-0 xl:grayscale dark:xl:grayscale-0 xl:group-hover:-translate-x-7 xl:group-hover:-translate-y-6 xl:group-hover:grayscale-0 ease-linear duration-500 absolute top-0 z-20 px-[5px] group-hover:px-0">
                    <Image src={data.cover} width={650} height={400} alt={`${data.name}-cover pic`} className="rounded-lg overflow-hidden" placeholder='blur' blurDataURL='/assets/image/imgPlaceholder.jpg' />
                </div>
                <div className={webCardCss} style={{ '--stroke-color': themeColor } as CSSProperties}  >
                    <div className="z-10 h-fit">
                        <p className={`hidden xl:flex absolute -rotate-90 top-16 font-bold uppercase text-sm text-slate-500 ${data.type == 'project' ? '-right-[2.15rem]' : '-right-6'}`} style={ubuntu.style}>
                            {data.type == 'project' ? 'web project' : 'web work'}
                        </p>
                        <motion.div initial='closed' whileInView='open' viewport={{ once: false, amount: 0.3 }} variants={outerVariants} className="px-4 py-4" style={poppins.style}>
                            <motion.p variants={innerVariants} className={`mb-2 px-4 py-1 rounded-xl text-xs text-center text-white w-fit ${data.status == 'completed' ? 'bg-green-500' : 'bg-red-500'}`}>
                                {data.status}
                            </motion.p>
                            <motion.div variants={innerVariants} >
                                <AnimatedHeading title={data.name} color={themeColor} classList="text-xl xl:text-2xl capitalize" font={comicNeue} />
                            </motion.div>
                            <motion.p variants={innerVariants} className='mt-2'>{data.intro}</motion.p>
                            <motion.p variants={innerVariants} className='mt-4 text-sm group-hover:text-blue-500 px-4 py-2 rounded-lg w-fit dark:bg-slate-700  dark:text-white bg-gray-200 text-black'>Read More</motion.p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

        </Link>
    )
}

export default WebProjectCard