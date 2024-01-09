'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useAppTheme } from "../theme/AppTheme"
import { TbReload } from "react-icons/tb"

export default function WebProjectLoader() {

    const { roboto, ubuntu, themeColor } = useAppTheme()
    return (
        <div className='myContainer my-4 md:my-9 xl:my-16 2xl:my-36 dark:text-gray-300 bg-transparent dark:md:bg-slate-950 text-gray-800 md:bg-slate-50'>
            <div className="p-4 md:p-8 xl:p-16 flex flex-col justify-start">
                <h1 className="text-4xl md:text-5xl mb-4">
                    Learning<span className="font-bold ml-2">By Building</span>
                </h1>
                <p style={roboto.style} className='text-lg mt-4 max-w-[35rem]'>
                    Learning tech by building solo projects.
                </p>
                <Link href='/Projects' className={`${roboto.className} cursor-pointer text-xl font-semibold mt-2`} style={{ color: themeColor }}>
                    View all solo projects
                </Link>
                <motion.div className='my-20 mx-auto text-4xl' initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8 }}>
                    <TbReload />
                </motion.div>
                <h1 className="text-center text-2xl mt-4" style={ubuntu.style}>
                    <span className={`${roboto.className} font-bold mr-2`} style={{ color: themeColor }}>Loading :</span>Please wait until data being fetched 🥰.
                </h1>
            </div>
        </div>
    )
}