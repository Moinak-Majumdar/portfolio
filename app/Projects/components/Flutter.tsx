'use client'

import { motion } from 'framer-motion'
import AnimatedHeading from '@/app/components/others/AnimatedHeading'
import { useAppTheme } from '@/app/components/theme/AppTheme';
import FlutterCard from '@/app/components/others/FlutterCard';

const outerVariants = {
    open: { transition: { staggerChildren: 0.5, delayChildren: 0.3 }},
    closed: { transition: { staggerChildren: 0.5, staggerDirection: -1 }}
};
const Heading = {
    closed: { opacity: 0.5,},
    open: { opacity: 1, transition: {delay: 0.5} }
}

type T_Flutter = { _id: string, __v: number, name: string, intro: string, gitRepo: string, slug: string, description: string, release: string, cover: string, img: string[], status: string, badge: string[], libraries: string[] }

const Flutter = ({flutter}: {flutter: T_Flutter[]}) => {

    const {ubuntu} = useAppTheme()

    return (
        <div id="FlutterProjects" className='relative overflow-hidden myContainer py-[5rem]'>
            <motion.div initial='closed' whileInView='open' viewport={{ once: true, amount: 0.3 }} variants={outerVariants} className="flex flex-col justify-start">
                <motion.div variants={Heading}>
                    <AnimatedHeading classList="tracking-wide text-lg" font={ubuntu} title="FLUTTER PROJECTS" />
                    <h1 className="text-4xl md:text-5xl mb-4" style={ubuntu.style}>
                        Mobile App<span className="font-bold ml-2">Development</span>
                    </h1>
                </motion.div>
                <div className="md:px-8">
                    {flutter && flutter.map((elm) => {
                        return (
                            <div className="mt-10" key={elm.slug}>
                                <FlutterCard info={elm} />
                            </div>
                        )
                    })}
                </div>
            </motion.div>
        </div>
    )
}

export default Flutter