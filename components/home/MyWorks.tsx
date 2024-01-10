import { motion } from 'framer-motion'
import axios from 'axios';
import Link from 'next/link';
import { GiClick } from 'react-icons/gi'
import { useState, useEffect } from 'react';
import { TbReload } from 'react-icons/tb'
import AnimatedHeading from '../tools/AnimatedHeading'
import PopupError from '../tools/PopupError';
import { useFont } from '@/context/FontProvider';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import WebCard2 from '../others/WebCard2';

const outerVariants = {
  open: {
    transition: { staggerChildren: 0.5, delayChildren: 0.3 }
  },
  closed: {
    transition: { staggerChildren: 0.5, staggerDirection: -1 }
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

const MyWorks = () => {

  const [data, setData] = useState<T_data[]>();
  const [Loading, setLoading] = useState<boolean>(true)
  const [Error, setError] = useState<string | null>(null)
  const { ubuntu, roboto} = useFont();
  const darkMode = useSelector((s: RootState) => s.darkMode.mode);
  const theme = useSelector((s: RootState) => s.colorTheme);

  useEffect(() => {
    setLoading(true)
    async function get() {
      await axios.post(`${process.env.NEXT_PUBLIC_API_MANAGER}/getAllWeb`, {apiKey: process.env.NEXT_PUBLIC_DB_KEY, type: 'work' }, {headers: {'Content-Type': 'application/json'}}).then((response) => {
        setData([...response.data])
        setLoading(false)
      }).catch((error) => {
        console.log(error)
        setError('Something unexpected happens while fetching personal project data.')
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
    return <WorkLoader />
  }

  return (
    <>
      <div className={`myContainer py-[5rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        <motion.div initial='closed' whileInView='open' viewport={{ once: true, amount: 0.2 }} variants={outerVariants} className="flex flex-col justify-start">
          <motion.div variants={Heading}>
            <AnimatedHeading classList="tracking-wide text-lg" title="WEB WORKS" />
            <h1 className="text-4xl md:text-5xl mb-4" style={ubuntu.style}>
              My<span className="font-bold ml-2">Latest Works</span>
            </h1>
          </motion.div>
          <div>
            {data && <div className="mt-10 px-4 xl:px-8 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16">
              {data.map((curr, index) => {
                return (
                  <WebCard2 key={index} data={curr} />
                )
              })}
            </div>}
          </div>
        </motion.div>
      </div>
    </>
  )
}

const WorkLoader =  () => {
  const { ubuntu, roboto } = useFont();
  const darkMode = useSelector((s: RootState) => s.darkMode.mode);
  const theme = useSelector((s: RootState) => s.colorTheme);
  return (
    <>
      <div className={`myContainer py-[5rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        <div className="flex flex-col justify-start">
          <h1 className="text-4xl md:text-5xl mb-4" style={ubuntu.style}>
            My<span className="font-bold ml-2">Latest Works</span>
          </h1>
          <p className='text-lg mt-4 max-w-[35rem]' style={roboto.style}>
            Work I did for my clients.
          </p>
          <Link href='/Projects' style={{color: theme.val}} className={`${roboto.className} cursor-pointer text-xl font-semibold mt-2`}>
            View all my works
          </Link>
          <p className="flex items-center gap-2 lg:hidden">
            <GiClick style={{ color: theme.val, fontSize: '20px' }} />
            Click on each card for full description.
          </p>
          <motion.div className='mt-40 mx-auto text-4xl' initial={{rotate: 0}} animate={{rotate: 360}} transition={{repeat: Infinity, duration: 0.8}}>
            <TbReload/>
          </motion.div>
          <h1 className="text-center text-2xl mt-4" style={ubuntu.style}>
            <span className={`${roboto.className} font-bold mr-2`} style={{ color: theme.val}}>Loading :</span>Please wait until data being fetched 🥰.
          </h1>
        </div>
      </div>
    </>
  );
}

export default MyWorks