'use client'

import { motion } from 'framer-motion'
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { TbReload } from 'react-icons/tb';
import AnimatedHeading from '../tools/AnimatedHeading'
import PopupError from '../tools/PopupError';
import { useFont } from '@/context/FontProvider';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import WebCard2 from '../others/WebCard2';
import Bg from '../tools/Bg';

const outerVariants = {
  open: {
    transition: { staggerChildren: 0.3, delayChildren: 0.3 }
  },
  closed: {
    transition: { staggerChildren: 0.3, staggerDirection: -1 }
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

type T_data = { _id: string, name: string, type: string, role: string, intro: string, liveUrl: string, gitRepo: string, slug: string, description: string, img: string[], tools: string[], toolsLogo: string[], __v: number, status: string, cover: string }

const MyProjects = () => {

  const [data, setData] = useState<T_data[]>();
  const [Loading, setLoading] = useState<boolean>(true)
  const [Error, setError] = useState<string | null>(null)
  const { ubuntu } = useFont();
  const darkMode = useSelector((s: RootState) => s.darkMode.mode);

  useEffect(() => {
    setLoading(true)
    async function get() {
      await axios.post(`${process.env.NEXT_PUBLIC_API_MANAGER}/getAllWeb`, { apiKey: process.env.NEXT_PUBLIC_DB_KEY }, { headers: { 'Content-Type': 'application/json' } }).then((response) => {
        setData([...response.data])
        setLoading(false)
      }).catch((error) => {
        console.log(error)
        setError('Something unexpected happens while fetching web projects data.')
      })
    }
    get()
  }, [])

  if (Error) {
    return (
      <PopupError errors={Error} setErrors={setError} />
    )
  }

  if (Loading) {
    return (
      <ProjectLoader />
    )
  }

  return (
    <>
      <div className={`myContainer my-4 md:my-9 xl:my-16 2xl:my-36 rounded-lg shadow-2xl  ${ubuntu.className} ${darkMode ? 'text-gray-300 bg-transparent  md:bg-slate-950 shadow-black' : 'text-gray-800 bg-transparent md:bg-white shadow-slate-200'}`}>
        <motion.div initial='closed' whileInView='open' viewport={{ once: true, amount: 0.2 }} variants={outerVariants} className="p-4 md:p-8 xl:p-16 flex flex-col justify-start">
          <motion.div variants={Heading}>
            <AnimatedHeading classList="tracking-wide text-lg" title="WEB PROJECTS" />
            <h1 className="text-4xl md:text-5xl mb-4">
              Learning<span className="font-bold ml-2">By Building</span>
            </h1>
          </motion.div>
          <div>
            {data && <div className="mt-10 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16 relative">
              {data.map((curr, index) => {
                return (
                  <WebCard2 key={index} data={curr} />
                )
              })}
            </div>}
          </div>
        </motion.div>

      </div>
      {/* background */}
      <div className="absolute w-full h-full inset-0 -z-10">
        <Bg
          alt="landing pattern"
          src={darkMode ? '/assets/svg/body-dark.svg' : '/assets/svg/body-lite.svg'}
          className={darkMode? "opacity-100" : "opacity-40"}
        />
      </div>
    </>
  )
}

const ProjectLoader = () => {
  const { ubuntu, roboto } = useFont();
  const darkMode = useSelector((s: RootState) => s.darkMode.mode);
  const theme = useSelector((s: RootState) => s.colorTheme);
  return (
    <>
      <div className={`myContainer my-4 md:my-9 xl:my-16 2xl:my-36 ${ubuntu.className} ${darkMode ? 'text-gray-300 bg-transparent md:bg-slate-950' : 'text-gray-800 bg-transparent md:bg-white'}`}>
        <div className="p-4 md:p-8 xl:p-16 flex flex-col justify-start">
          <h1 className="text-4xl md:text-5xl mb-4">
            Learning<span className="font-bold ml-2">By Building</span>
          </h1>
          <p style={roboto.style} className='text-lg mt-4 max-w-[35rem]'>
            Learning tech by building solo projects.
          </p>
          <Link href='/Projects' className={`${roboto.className} cursor-pointer text-xl font-semibold mt-2`} style={{ color: theme.val }}>
            View all solo projects
          </Link>
          <motion.div className='my-20 mx-auto text-4xl' initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8 }}>
            <TbReload />
          </motion.div>
          <h1 className="text-center text-2xl mt-4" style={ubuntu.style}>
            <span className={`${roboto.className} font-bold mr-2`} style={{ color: theme.val }}>Loading :</span>Please wait until data being fetched 🥰.
          </h1>
        </div>
      </div>
      <div className="absolute w-full h-full inset-0 -z-10">
        <Bg
          alt="landing pattern"
          src={darkMode ? '/assets/svg/body-dark.svg' : '/assets/svg/body-lite.svg'}
          className={darkMode? "opacity-100" : "opacity-40"}
        />
      </div>
    </>
  )
}

export default MyProjects