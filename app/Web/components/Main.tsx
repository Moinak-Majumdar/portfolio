'use client'

import WebProjects from "@/app/components/home/WebProjects"
import { useEffect } from "react"
import { webProjectModel } from "@/app/utils/models"
import { motion } from "framer-motion"

const viewport = {
  once: false,
  amount: typeof window !== 'undefined' ? (window.innerWidth > 450 ? 0.3 : 0.1) : 0.3
}

const transition = {
  closed: { staggerChildren: 0.3, staggerDirection: -1 },
  open: { staggerChildren: 0.3, delayChildren: 0.2 }
}

export const MainSection = ({data}: {data: webProjectModel[]}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <motion.main id='WebProjects' initial='closed' whileInView='open' viewport={viewport} transition={transition} className='relative overflow-hidden bg-gradient-to-br dark:from-black dark:to-transparent from-gray-100 to-slate-100'>
      <WebProjects data={data} />
    </motion.main>
  )
}
