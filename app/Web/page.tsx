"use client"

import { motion } from "framer-motion"
import WebProjects from "../components/home/WebProjects"

const viewport = {
    once: false,
    amount: typeof window !== 'undefined' ? (window.innerWidth > 450 ? 0.3 : 0.1) : 0.3
}

const transition = {
    closed: { staggerChildren: 0.3, staggerDirection: -1 },
    open: { staggerChildren: 0.3, delayChildren: 0.2 }
}

const page = () => {
    return (
        <motion.main id='WebProjects' initial='closed' whileInView='open' viewport={viewport} transition={transition} className='relative overflow-hidden bg-gradient-to-br dark:from-black dark:to-transparent from-gray-100 to-slate-100'>
            <WebProjects />
        </motion.main>
    )
}

export default page