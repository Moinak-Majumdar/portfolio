'use client'

import Button from '@/components/ui/Button';
import { useAppTheme } from '@/components/theme/AppTheme';
import ImgSlider2 from "@/components/ui/ImgSlider2";
import { poppins, ubuntu } from '@/app/utils/Fonts';
import localTimeStamp from '@/app/utils/localTimeStamp';
import { IconAndroid, IconGithub, IconImage, IconRollback } from '@/icons';
import IFlutterProject from '@/interface/flutterProject';
import { Variants, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const outerVariants = { open: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } }, closed: { transition: { staggerChildren: 0.7, staggerDirection: -1 } } };
const linkVariants = { open: { y: 0, opacity: 1 }, closed: { y: -100, opacity: 0 } }
const textVariants = { open: { opacity: 1, transition: { delay: .5 } }, closed: { opacity: 0 } }
const languageVariants: Variants = { open: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300 } }, closed: { scale: 0, opacity: 0, } }
const Bottom = { open: { opacity: 1 }, closed: { opacity: 0 } }



const Details = ({ Data }: { Data: IFlutterProject }) => {

    const { themeColor } = useAppTheme();
    const links = [{ url: Data.release, icon: <IconAndroid />, text: 'Release' }, { url: Data.gitRepo, icon: <IconGithub />, text: 'Git Repositories' }];
    const router = useRouter();

    return (
        <>
            <motion.div variants={outerVariants} initial='closed' whileInView='open' viewport={{ once: true, amount: 0.2 }} className="flex flex-col">
                <div className="flex flex-col justify-center w-full">
                    <motion.article variants={textVariants} style={poppins.style} className="text-base lg:text-lg w-full py-4 mr-4" dangerouslySetInnerHTML={{ __html: Data.description.html }}>
                    </motion.article>
                    <div className="w-fit mt-8 flex flex-col lg:flex-row items-center justify-center mx-auto lg:gap-10">
                        <div className="w-[90%] lg:max-w-[18rem] flex flex-col ml-0 lg:ml-8 mb-8 lg:mb-0 lg:text-xl text-lg justify-center lg:justify-start">
                            {links.map((curr, i) => {
                                return (
                                    <motion.button key={`links-${i}`} variants={linkVariants} className="mt-4 py-2 px-3 md:px-4 rounded-full flex items-center border-2" style={{ borderColor: themeColor, boxShadow: `0px 0px 15px ${themeColor}` }} >
                                        {curr.icon}
                                        <Link href={curr.url} target='_blank' rel="noreferrer" scroll={false} className="ml-2" style={poppins.style}>{curr.text}</Link>
                                    </motion.button>
                                )
                            })}
                        </div>
                        <div className="mt-6 md:mt-0 grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-10 w-fit mx-auto">
                            {Data['badge'].map((curr, index) => {
                                return (
                                    <motion.div variants={languageVariants} key={index} className='rounded-2xl px-6 py-4 w-24 flex items-center flex-col capitalize shadow-2xl dark:bg-slate-800/80 dark:shadow-black bg-slate-100 shadow-slate-400' style={poppins.style}>
                                        <Image src={`/assets/language/${curr}`} height={50} width={50} alt={curr} />
                                        <span className='text-base mt-2'>{curr.split('.')[0]}</span>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <motion.div variants={Bottom} className="mx-auto flex flex-col mt-20 w-full">
                    <div className="mx-auto mb-6 flex items-center text-2xl md:text-3xl">
                        <IconImage className="text-4xl" style={{ color: themeColor }} />
                        <h1 className='ml-2' style={ubuntu.style}>Some
                            <span className="ml-2 font-bold">Screenshots</span>
                        </h1>
                    </div>
                    <ImgSlider2 images={Data.img} fade={true} />
                    <div className="mt-16 flex flex-col items-start">
                        <h3 className="text-2xl font-bold" style={ubuntu.style}>Pub Dependencies :</h3>
                        <p className="mt-2" style={poppins.style}>
                            {Data.libraries.toString().replaceAll(',', ", ")}
                        </p>
                    </div>
                    <p className="my-16 text=2xl text-center">
                        <span className="mr-2 font-bold" style={ubuntu.style}>Document last updated on:</span>
                        <span style={poppins.style}>{localTimeStamp(new Date(Data.updatedAt))}</span>
                    </p>
                    <div className=' mx-auto'>
                        <Button onClick={() => router.back()}>
                            <div className='text-2xl flex items-center gap-4'>
                                <IconRollback />
                                <span style={poppins.style} className='font-bold'>Back</span>
                            </div>
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
            {!!Data.description.css && <style>{Data.description.css}</style>}
        </>
    )
}

export default Details