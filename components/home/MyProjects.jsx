import { motion } from 'framer-motion'
import Link from 'next/link';
import axios from 'axios'
import { useEffect, useState } from "react"
import DocCard from "../others/DocCard";
import PopupError from '../tools/PopupError'

const Left = {
  closed: {
    x: 50,
    y: 50,
    opacity: 0.1,
  },
  open: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1
    }
  }
}

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
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [Error, setError] = useState(null)

  const options = {
    method: 'POST',
    url: process.env.NEXT_PUBLIC_GET_ALL_DOC_API,
    params: {
      apiKey: process.env.NEXT_PUBLIC_DB_KEY
    },
    headers: { 'Content-Type': 'application/json' },
    data: { type: 'project' }
  };
  useEffect(() => {
    setLoading(true)
    async function getData() {
      await axios.request(options).then((response) => {
        const projects = response.data
        setData([...projects])
      }).catch((error) => {
        const status = error.response.status;
        const data = error.response.data;
        const s = status.toString()
        if (s === '404' || s === '400') {
          setError(data.error)
          console.log(error);
        } else if (s === '420') {
          setError(data.badRequest)
          console.log(error);
        } else {
          setError('Check Console')
          console.log(Error)
        }
      }).then(() => {
        setLoading(false)
      });
    }
    getData()
  }, [])

  if (Error) {
    return (
      <PopupError errors={Error} setErrors={setError} />
    )
  }

  return (
    <section id='myProjects' className='relative overflow-hidden'>
      <div className={`myContainer py-[5rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        <div className="flex flex-col justify-start">
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
          <motion.div variants={Left}>
            {isLoading && <h1 className="text-center text-5xl mt-40"><span style={{ color: `${theme.val}` }}>Loading...</span></h1>}
            {!data && <h1 className="text-center text-4xl mt-40"><span className="font-ubuntu font-bold" style={{ color: `${theme.val}` }}>Server Error:</span> Failed to fetch projects.</h1>}
            {data && <div className="mt-4 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
              {data.map((curr, index) => {
                return (
                  <DocCard key={index} darkMode={darkMode} theme={theme} data={curr} />
                )
              })}
            </div>}
          </motion.div>
        </div>
      </div>
      <motion.div variants={Heading}>
      </motion.div>
    </section>
  )
}


export default MyProjects