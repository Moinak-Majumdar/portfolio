import { useFont } from "@/context/FontProvider";
import { RootState } from "@/redux/store";
import { MotionStyle, Variants, motion } from "framer-motion";
import Image from 'next/legacy/image';
import Link from "next/link";
import { useSelector } from "react-redux"
import AnimatedHeading from "../tools/AnimatedHeading";
import cardStyle from '@/styles/WebCard2.module.css'
import { CSSProperties } from "react";

const outerVariants: Variants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2, delay: .4 } },
    closed: { transition: { staggerChildren: 0.07, staggerDirection: -1 } }
};
const innerVariants: Variants = {
    open: { y: 0, opacity: 1, transition: { type: 'linear', stiffness: 300 } },
    closed: { y: 50, opacity: 0, transition: { type: 'linear', stiffness: 300 } }
};

type T_data = { _id: string, name: string, type: string, role: string, intro: string, liveUrl: string, gitRepo: string, slug: string, description: string, img: string[], tools: string[], toolsLogo: string[], __v: number, status: string, cover: string }

const WebCard2 = ({ data }: { data: T_data }) => {
    const { comicNeue, poppins, ubuntu } = useFont();
    const darkMode = useSelector((s: RootState) => s.darkMode.mode);
    const theme = useSelector((s: RootState) => s.colorTheme);


    return (
        <Link href={`Web/${data.slug}`} className="relative">
            <motion.section className="relative group" whileTap={{ scale: 0.9 }}>
                <div className="translate-x-0 translate-y-0 xl:group-hover:-translate-x-7 xl:group-hover:-translate-y-6 ease-linear duration-500 absolute top-0 z-20 px-[5px] group-hover:px-0">
                    <Image src={data.cover} width={650} height={400} alt={`${data.name}-cover pic`} className="rounded-lg overflow-hidden" placeholder='blur' blurDataURL='/assets/image/imgPlaceholder.jpg' />
                </div>
                <div className={darkMode ? cardStyle.darkWebCard2 : cardStyle.lightWebCard2} style={{ '--stroke-color': theme.val } as CSSProperties}  >
                    <div className="z-10 h-fit">
                        <p className={`hidden xl:flex absolute  -rotate-90 top-16 font-bold uppercase text-sm ${data.type == 'project' ? '-right-[2.15rem]' : '-right-6'} ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} style={ubuntu.style}>
                            {data.type == 'project' ? 'web project' : 'web work'}
                        </p>
                        <motion.div initial='closed' whileInView='open' viewport={{ once: false, amount: 0.3 }} variants={outerVariants} className="px-4 py-4" style={poppins.style}>
                            <motion.p variants={innerVariants} className={`mb-2 px-4 py-1 rounded-xl text-xs text-center text-white w-fit ${data.status == 'completed' ? 'bg-green-500' : 'bg-red-500'}`}>
                                {data.status}
                            </motion.p>
                            <motion.div variants={innerVariants} >
                                <AnimatedHeading title={data.name} color={theme.val} classList="text-xl xl:text-2xl capitalize" font={comicNeue} />
                            </motion.div>
                            <motion.p variants={innerVariants} className='mt-2'>{data.intro}</motion.p>
                            <motion.p variants={innerVariants} className={`mt-4 text-sm group-hover:text-blue-500 px-4 py-2 rounded-md w-fit ${darkMode ? 'bg-slate-700  text-white' : 'bg-slate-200 text-black'}`}>Read More</motion.p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

        </Link>
    )
}

export default WebCard2