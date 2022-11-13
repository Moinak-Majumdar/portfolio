import { useEffect, useState } from "react"
import axios from 'axios'
import { motion } from 'framer-motion'
import DocCard from "../others/DocCard";
import Bg from '../tools/Bg'
import { GiClick } from 'react-icons/gi'

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

const MyWorks = ({darkMode, theme, key }) => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const options = {
    method: 'POST',
    url: process.env.NEXT_PUBLIC_GET_ALL_DOC_API,
    params: {
      apiKey: process.env.NEXT_PUBLIC_DB_KEY
    },
    headers: { 'Content-Type': 'application/json' },
    data: { type: 'work' }
  };
  useEffect(() => {
    setLoading(true)
    async function getData() {
      await axios.request(options).then((response) => {
        const projects = response.data
        setData([...projects])
      }).catch((error) => {
        console.error(error);
      }).then(() => {
        setLoading(false)
      });
    }
    getData()
  }, [])

  return (
    <section key={key} id='myWorks' className='relative overflow-hidden'>
      <div className={`myContainer py-[5rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        <div className="flex flex-col justify-start">
          <motion.div variants={Heading}>
            <h4 className="font-ubuntu tracking-wide text-lg">PROJECTS</h4>
            <h1 className="text-4xl md:text-5xl mb-4 font-ubuntu">
              My<span className="font-ubuntu font-bold ml-2">Latest Works</span>
            </h1>
            <p className="flex items-center gap-2">
              <GiClick style={{color: theme.val, fontSize: '20px'}}/>
              Click on each card for full description.
            </p>
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
      <motion.div variants={Heading} className="absolute w-full lg:w-1/3 h-1/3 top-10 left-0 -z-10">
      <div className={`absolute w-full h-full inset-0 bg-gradient-to-t z-10 ${darkMode? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
        <Bg
          alt="landing pattern"
          src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
          className="opacity-60"
        />
        <div className={`absolute w-full h-full inset-0 bg-gradient-to-r z-10 ${darkMode? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
      </motion.div>
    </section>
  )
}


export default MyWorks