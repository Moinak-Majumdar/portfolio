'use client'

import FlutterProjects from '@/app/components/home//FlutterProjects'
import { motion } from 'framer-motion'
import React from 'react'

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
    <motion.main id='FlutterProjects' initial='closed' whileInView='open' viewport={viewport} transition={transition} className='relative overflow-hidden'>
      <FlutterProjects />
    </motion.main>
  )
}

export default page