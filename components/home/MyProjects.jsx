import { motion } from 'framer-motion'
import axios from 'axios'
import Link from 'next/link';
import { useState, useEffect } from 'react'
import PopupError from '../tools/PopupError'
import DocCard from "../others/DocCard";

const viewport = {
  once: false,
  amount: typeof window !== 'undefined' ? (window.innerWidth > 450 ? 0.5 : 0.05) : 0.5
}
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
      delay: 0.5
    }
  }
}


const MyProjects = ({ darkMode, theme }) => {

  const [Project, setProject] = useState(null)
  const [Error, setError] = useState(null)
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    async function getProject() {
      const optProject = {
        method: 'POST',
        url: process.env.NEXT_PUBLIC_GET_ALL_DOC_API,
        params: {
          apiKey: process.env.NEXT_PUBLIC_DB_KEY
        },
        headers: { 'Content-Type': 'application/json' },
        data: { type: 'project' }
      };
      await axios.request(optProject).then((response) => {
        setProject(response.data)
        setLoading(false)
      }).catch((error) => {
        const status = error.response.status;
        const data = error.response.data;
        const s = status.toString()

        if (s === '420') {
          setError(data.badRequest)
          console.log(error)
        } else if (s === '422' || s === '404' || s === '400') {
          setError(data.error)
          console.log(error)
        }
      })
    }
    getProject()
  }, [])

  if (Error) {
    return (
      <PopupError errors={Error} setErrors={setError} />
    )
  }

  return (
    <section id='myProjects' className='relative overflow-hidden'>
      <div className={`myContainer py-[5rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        <motion.div initial='closed' whileInView='open' viewport={viewport} variants={outerVariants} className="flex flex-col justify-start">
          <motion.div variants={Heading}>
            <h4 className="font-ubuntu tracking-wide text-lg">PROJECTS</h4>
            <h1 className="text-4xl md:text-5xl mb-4 font-ubuntu">
              Learning<span className="font-ubuntu font-bold ml-2">By Building</span>
            </h1>
            <p className='font-roboto text-lg mt-4 max-w-[35rem]'>
              Learning tech by building solo projects.
            </p>
            <div className='mt-2'>
              <Link href='/Projects'>
                <a className='font-roboto text-xl font-bold' style={{ color: theme.val }}>View all solo projects</a>
              </Link>
            </div>
          </motion.div>
          <div>
            {!Project && <h1 className="text-center text-4xl mt-40"><span className="font-ubuntu font-bold" style={{ color: `${theme.val}` }}>Loading :</span>Please wait until data being fetched 🥰.</h1>}
            {!Loading && Project && <div className="mt-4 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
              {Project.map((curr, index) => {
                return (
                  <DocCard key={index} darkMode={darkMode} theme={theme} data={curr} />
                )
              })}
            </div>}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


export default MyProjects