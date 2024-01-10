import { useFont } from "@/context/FontProvider";
import { RootState } from "@/redux/store";
import axios from "axios";
import { Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Bg from "../tools/Bg";
import AnimatedHeading from "../tools/AnimatedHeading";
import FlutterCard from "../others/FlutterCard";

const outerVariants = {
  open: {
    transition: { staggerChildren: 0.3, delayChildren: 0.3 }
  },
  closed: {
    transition: { staggerChildren: 0.3, staggerDirection: -1 }
  }
};

const Heading: Variants = {
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

type T_Flutter = { _id: string, __v: number, name: string, intro: string, gitRepo: string, slug: string, description: string, release: string, cover: string, img: string[], status: string, badge: string[], libraries: string[] }

const FlutterProjects = () => {

  const [data, setData] = useState<T_Flutter[]>();
  const [Loading, setLoading] = useState<boolean>(true)
  const [Error, setError] = useState<string | null>(null)
  const { ubuntu, roboto } = useFont();
  const darkMode = useSelector((s: RootState) => s.darkMode.mode);
  const theme = useSelector((s: RootState) => s.colorTheme);

  useEffect(() => {
    setLoading(true)
    async function get() {
      await axios.post(`${process.env.NEXT_PUBLIC_API_MANAGER}/getAllFlutter`, { apiKey: process.env.NEXT_PUBLIC_DB_KEY }, { headers: { 'Content-Type': 'application/json' } }).then((response) => {
        const d = [...response.data]
        // const res = d.filter((curr) => {
        //   return curr.type === 'project'
        // })
        setData(d)
        setLoading(false)
      }).catch((error) => {
        console.log(error)
        setError('Something unexpected happens while fetching web projects data.')
      })
    }
    get();
  }, [])


  return (
    <>
      <div className={`myContainer py-[5rem] ${ubuntu.className} ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        <motion.div initial='closed' whileInView='open' viewport={{ once: true, amount: 0.2 }} variants={outerVariants} className="flex flex-col justify-start">
          <motion.div variants={Heading}>
            <AnimatedHeading classList="tracking-wide text-lg" title="FLUTTER PROJECTS" />
            <h1 className="text-4xl md:text-5xl mb-4">
              Mobile App<span className="font-bold ml-2">Development</span>
            </h1>

          </motion.div>
          <div className="md:px-8">
            {data && data.map((elm) => {
              return (
                <div className="mt-10" key={elm.slug}>
                  <FlutterCard info={elm} />
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
      {/* background */}
      {/* <div className="absolute w-full h-full  top-0 left-0 -z-10">
        <div className={`absolute w-full h-full inset-0 bg-gradient-to-r z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
        <Bg
          alt="landing pattern"
          src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
          className="opacity-80"
        />
        <div className={`absolute w-full h-full inset-0 bg-gradient-to-t z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
      </div> */}
    </>
  )
}

export default FlutterProjects