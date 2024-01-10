import { Variants, motion } from 'framer-motion'
import { useRouter } from 'next/router';
import axios from "axios";
import Image from "next/legacy/image";
import { FaGithub, FaLink, FaGripfire, FaRegImages } from 'react-icons/fa'
import Head from 'next/head'
import { AiOutlineRollback } from 'react-icons/ai'
import { ImgSlider2 } from '@/components/tools/ImgSlider2';
import Bg from "../../components/tools/Bg";
import Button from '../../components/tools/Button'
import AnimatedHeading from '../../components/tools/AnimatedHeading'
import { GetServerSidePropsContext } from 'next';
import { useFont } from '@/context/FontProvider';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import DevFlag from '@/components/others/DevFlag';

const outerVariants = { open: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } }, closed: { transition: { staggerChildren: 0.7, staggerDirection: -1 } } };
const textVariants = { open: { opacity: 1, transition: { delay: .5 } }, closed: { opacity: 0 } }
const linkVariants = { open: { y: 0, opacity: 1 }, closed: { y: -100, opacity: 0 } }
const languageVariants: Variants = { open: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300 } }, closed: { scale: 0, opacity: 0, } }
const Bottom = { open: { opacity: 1 }, closed: { opacity: 0 } }

type T_data = { _id: string, name: string, type: string, role: string, intro: string, liveUrl: string, gitRepo: string, slug: string, description: string, img: string[], tools: string[], toolsLogo: string[], __v: number, status: string, cover: string }

const Web = ({ DATA }: { DATA: T_data }) => {

  const router = useRouter();
  const { roboto, ubuntu, poppins, } = useFont();
  const darkMode = useSelector((s: RootState) => s.darkMode.mode);
  const theme = useSelector((s: RootState) => s.colorTheme);
  const images = [...DATA.img]
  const links = [{ url: DATA.liveUrl, icon: <FaLink />, text: 'Live Url' }, { url: DATA.gitRepo, icon: <FaGithub />, text: 'Git Repositories' }]

  const devFlag:boolean = process.env.NEXT_PUBLIC_DEV_FLAG == 'yes' ? true : false;

  return (
    <>
      {devFlag && <DevFlag />}
      <Head>
        <meta property='og:title' content={`Moinak Majumdar | Details`} />
        <title>{`Moinak Majumdar | Details`}</title>
      </Head>
      <section className={`relative min-h-screen ${darkMode ? 'bg-gradient-to-t from-slate-900' : ''}`}>
        <div className={`myContainer pt-[4rem] pb-[2rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
          <AnimatedHeading classList="mt-8 uppercase" title={DATA.type === 'project' ? 'web project' : 'web work'} />
          <h1 style={ubuntu.style} className="font-bold lg:text-5xl text-4xl capitalize">{DATA.name}</h1>
          <motion.div variants={outerVariants} viewport={{ once: false, amount: 0.2 }} initial='closed' animate='open' className="flex flex-col">
            <div className="flex flex-col justify-center w-full">
              {/* hl5 description */}
              <motion.article variants={textVariants} style={poppins.style} className="text-base lg:text-lg w-full py-4 mr-4" dangerouslySetInnerHTML={{ __html: DATA.description }}>
              </motion.article>
              {/* hl5 ____________*/}
              <div className="w-fit mt-8 flex flex-col lg:flex-row items-center justify-center mx-auto lg:gap-10">
                <div className="w-[90%] lg:max-w-[18rem] flex flex-col ml-0 xl:ml-8 lg:text-xl text-lg justify-center lg:justify-start">
                  {links.map((curr, i) => {
                    return (
                      <motion.a key={`links-${i}`} variants={linkVariants} className="mt-4 py-2 px-3 md:px-4 rounded-full flex items-center border-2" style={{ borderColor: theme.val, boxShadow: `0px 0px 25px ${theme.val}` }} href={curr.url} target='_blank' rel="noreferrer">
                        {curr.icon}
                        <span className="ml-2" style={poppins.style}>{curr.text}</span>
                      </motion.a>
                    )
                  })}
                </div>
                <div className="text-lg md:text-xl mt-8 flex flex-col">
                  <motion.div variants={languageVariants} className="text-2xl flex items-center">
                    <FaGripfire className="text-3xl md:text-4xl animate-pulse" style={{ color: theme.val }} />
                    <span className="ml-2" style={ubuntu.style}>Language, Frameworks / Libraries</span>
                  </motion.div>
                  <div className="mt-8 grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-10 w-fit mx-auto">
                    {DATA['tools'].map((curr, index) => {
                      return (
                        <motion.div variants={languageVariants} key={index} className={`rounded-2xl px-6 py-4 w-24 flex items-center flex-col capitalize shadow-2xl ${darkMode ? 'bg-slate-800/80 shadow-black': 'bg-slate-100 shadow-slate-400'}`} style={poppins.style}>
                          <Image src={`/assets/language/${DATA.toolsLogo[index]}`} height={50} width={50} alt={DATA.toolsLogo[index]} />
                          <span className='text-base'>{curr}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <motion.div variants={Bottom} className="mx-auto flex flex-col mt-20 w-full">
              <div className="mx-auto mb-6 flex items-center text-2xl md:text-3xl">
                <FaRegImages className="text-4xl" style={{ color: theme.val }} />
                <h1 className='ml-2' style={ubuntu.style}>Some
                  <span className="ml-2 font-bold">Screenshots</span>
                </h1>
              </div>
              <ImgSlider2 images={images} />
              <div className='mt-16 mx-auto'>
                <Button onClick={() => router.back()}>
                  <div className='text-2xl flex items-center gap-4'>
                    <AiOutlineRollback />
                    <span style={poppins.style} className='font-bold'>Back</span>
                  </div>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute w-full md:w-1/3 h-full top-0 left-0 -z-10">
          <div className={`absolute w-full h-full inset-0 bg-gradient-to-l z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
          <Bg
            alt="landing pattern"
            src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
            className="opacity-100"
          />
          <div className={`absolute w-full h-full inset-0 bg-gradient-to-t z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ providerId: string }>) {

  const { Web } = context.query;

  let serverData
  await axios.post(`${process.env.NEXT_PUBLIC_API_MANAGER}/getWeb`, { apiKey: process.env.NEXT_PUBLIC_DB_KEY, slug: Web }, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
    serverData = res.data
  }).catch((err) => {
    console.log(err)
  })

  return { props: { DATA: serverData } }
}


export default Web