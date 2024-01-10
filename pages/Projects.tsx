import { motion } from 'framer-motion'
import axios from 'axios';
import Head from 'next/head';
import { GiClick } from 'react-icons/gi'
import WebCard from "../components/others/WebCard";
import Bg from '../components/tools/Bg'
import Footer from '../components/layout/Footer'
import AnimatedHeading from '../components/tools/AnimatedHeading';
import { useFont } from '@/context/FontProvider';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import PopupError from '@/components/tools/PopupError';
import { useRouter } from 'next/navigation';
import DevFlag from '@/components/others/DevFlag';
import WebCard2 from '@/components/others/WebCard2';
import FlutterCard from '@/components/others/FlutterCard';

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
      delay: 0.5
    }
  }
}

type T_Web = { _id: string, name: string, type: string, role: string, intro: string, liveUrl: string, gitRepo: string, slug: string, description: string, img: string[], tools: string[], toolsLogo: string[], __v: number, status: string, cover: string };
type T_Flutter = { _id: string, __v: number, name: string, intro: string, gitRepo: string, slug: string, description: string, release: string, cover: string, img: string[], status: string, badge: string[], libraries: string[] }
interface props { WebProjects?: T_Web[], FlutterProjects?: T_Flutter[] }

const Projects = ({ WebProjects, FlutterProjects }: props) => {

  const [fError, setFError] = useState<string | null>('Something unexpected happens while fetching flutter projects data.');
  const [wError, setWError] = useState<string | null>('Something unexpected happens while fetching web projects data.');
  const { ubuntu, roboto } = useFont();
  const darkMode = useSelector((s: RootState) => s.darkMode.mode);
  const theme = useSelector((s: RootState) => s.colorTheme);
  const router = useRouter();

  const devFlag: boolean = process.env.NEXT_PUBLIC_DEV_FLAG == 'yes' ? true : false;

  if (fError == null && wError == null) {
    router.replace('/500');
  }

  return (
    <>
      {devFlag && <DevFlag />}
      <Head>
        <meta property='og:title' content='Moinak Majumdar | Projects' />
        <title>Moinak Majumdar | Projects</title>
      </Head>
      <section className={`flex flex-col ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        <div id='WebProjects' className='relative overflow-hidden myContainer py-[5rem]'>
          <motion.div initial='closed' whileInView='open' viewport={{ once: true, amount: 0.3 }} variants={outerVariants} className="flex flex-col justify-start">
            <motion.div variants={Heading}>
              <AnimatedHeading classList="tracking-wide text-lg" font={ubuntu} title="WEB PROJECTS" />
              <h1 className="text-4xl md:text-5xl mb-4" style={ubuntu.style}>
                Learning<span className="font-bold ml-2">By Building</span>
              </h1>
            </motion.div>
            <div>
              {WebProjects && <div className="mt-10 px-4 xl:px-8 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16">
                {WebProjects.map((curr, index) => {
                  return (
                    <WebCard2 key={index} data={curr} />
                  )
                })}
              </div>}
              {!WebProjects && wError && <PopupError errors={wError} setErrors={setWError} />}
            </div>
          </motion.div>
        </div>
        <div id="FlutterProjects" className='relative overflow-hidden myContainer py-[5rem]'>
          <motion.div initial='closed' whileInView='open' viewport={{ once: true, amount: 0.3 }} variants={outerVariants} className="flex flex-col justify-start">
            <motion.div variants={Heading}>
              <AnimatedHeading classList="tracking-wide text-lg" font={ubuntu} title="FLUTTER PROJECTS" />
              <h1 className="text-4xl md:text-5xl mb-4" style={ubuntu.style}>
                Mobile App<span className="font-bold ml-2">Development</span>
              </h1>
            </motion.div>
            <div className="md:px-8">
              {FlutterProjects && FlutterProjects.map((elm) => {
                return (
                  <div className="mt-10" key={elm.slug}>
                    <FlutterCard info={elm} />
                  </div>
                )
              })}
              {!FlutterProjects && fError && <PopupError errors={fError} setErrors={setFError} />}
            </div>
          </motion.div>
        </div>
        <div className="fixed w-full lg:w-1/3 h-full top-0 right-0 -z-10">
          <div className={`absolute w-full h-full inset-0 bg-gradient-to-t z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
          <Bg
            alt="landing pattern"
            src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
            className="opacity-100"
          />
          <div className={`absolute w-full h-full inset-0 bg-gradient-to-r z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
        </div>
        <Footer />
      </section>
    </>
  )
}

export async function getServerSideProps() {

  try {
    const web = await axios.post(`${process.env.NEXT_PUBLIC_API_MANAGER}/getAllWeb`, { apiKey: process.env.NEXT_PUBLIC_DB_KEY }, { headers: { 'Content-Type': 'application/json' } })
    const WebProjects: T_Web[] = web.data;

    const flutter = await axios.post(`${process.env.NEXT_PUBLIC_API_MANAGER}/getAllFlutter`, { apiKey: process.env.NEXT_PUBLIC_DB_KEY }, { headers: { 'Content-Type': 'application/json' } });
    const FlutterProjects: T_Flutter[] = flutter.data;

    return { props: { WebProjects, FlutterProjects } }
  } catch (error) {
    console.log('fetch error')
    return { props: { WebProjects: null, FlutterProjects: null } }
  }
}

export default Projects