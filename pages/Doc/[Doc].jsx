import { motion } from 'framer-motion'
import { useRouter } from 'next/router';
import axios from "axios";
import Image from "next/image";
import { FaGithub, FaLink, FaGripfire, FaRegImages } from 'react-icons/fa'
import { AiOutlineRollback } from 'react-icons/ai'
import ProjectImgSlider from "../../components/others/ProjectImgSlider";
import Bg from "../../components/tools/Bg";
import Button from '../../components/tools/Button'

const viewport = {
  once: false,
  amount: typeof window !== 'undefined' ? (window.innerWidth > 450 ? 0.5 : 0.05) : 0.5
}
const outerVariants = {
  open: {
      transition: { staggerChildren: 0.5, delayChildren: 0.3 }
  },
  closed: {
      transition: { staggerChildren: 0.5, staggerDirection: -1 }
  }
};
const Left = {
  open : {
    y: 0, x: 0, opacity: 1,
  },
  closed: {
    y: 100, x: -100, opacity: 0 
  }
}
const Right = { 
  open: {
    x: 0, y: 0, opacity: 1,
  },
  closed : {
    y: -100, x: 100, opacity: 0
  }
}
const Bottom = {
  open: {
    opacity: 1 
  },
  closed: {
    opacity: 0
  }
}

const Doc = ({ project, darkMode, theme }) => {

  const router = useRouter();
  const images = [...project.img]

  return (
    <section className={`relative min-h-screen ${darkMode ? 'bg-gradient-to-t from-slate-900' : ''}`}>
      <div className={`myContainer pt-[4rem] pb-[2rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        <h4 className="mt-8 uppercase">
          {project.type === 'project' ? 'about project' : 'about work'}
        </h4>
        <h1 className="font-ubuntu font-bold lg:text-5xl text-4xl capitalize">{project.name}</h1>
        <motion.div initial='closed' whileInView='open' viewport={viewport} variants={outerVariants} className="flex flex-col">
          <div className="flex lg:flex-row justify-center lg:justify-between flex-col w-full">
            {/* hl5 description */}
            <motion.div variants={Left} className="text-lg md:text-xl lg:max-w-2xl 2xl:max-w-3xl py-4 mr-4" dangerouslySetInnerHTML={{ __html: project.description }}>
            </motion.div>
            <motion.div variants={Right} className="w-fit flex flex-col-reverse lg:flex-col">
              {/* hl7 links */}
              <div className="w-fit flex xl:flex-row flex-col ml-2 xl:ml-0">
                <a className="mt-4 text-xl py-2 px-4 rounded-full flex items-center mr-2 border-2" style={{ borderColor: theme.val, boxShadow: `0px 0px 25px ${theme.val}` }} href={project.liveUrl} target='_blank' rel="noreferrer">
                  <FaLink />
                  <span className="ml-2 font-ubuntu">Live Url</span>
                </a>
                <a className="mt-4 text-xl py-2 px-4 rounded-full flex items-center border-2" style={{ borderColor: theme.val, boxShadow: `0px 0px 25px ${theme.val}` }} href={project.gitRepo} target='_blank' rel="noreferrer">
                  <FaGithub />
                  <span className="ml-2 font-ubuntu">Git Repositories</span>
                </a>
              </div>
              {/* hl3 tools */}
              <div className="text-lg md:text-xl mt-8 flex flex-col">
                <div className="text-2xl flex items-center">
                  <FaGripfire className="text-4xl" style={{ color: theme.val }} />
                  <span className="ml-2 font-ubuntu">Language, Frameworks / Libraries</span>
                </div>
                <div className="mt-2 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-3 2xl:grid-cols-4 gap-4 w-fit">
                  {project['tools'].map((curr, index) => {
                    return (
                      <div key={index} className="rounded-full px-4 py-2 w-fit flex items-center flex-col font-comicNeue">
                        <Image src={`/assets/language/${project.toolsLogo[index]}`} height={50} width={50} alt={project.toolsLogo[index]} />
                        {curr}
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div variants={Bottom} className="mx-auto flex flex-col mt-10 w-full">
            <div className="ml-6 mb-4 flex items-center text-2xl md:text-3xl">
              <FaRegImages className="text-4xl" style={{ color: theme.val }} />
              <h1 className='font-ubuntu ml-2'>Some
                <span className="ml-2 font-ubuntu font-bold">Screenshots</span>
              </h1>
            </div>
            <ProjectImgSlider images={images} theme={theme} />
            <div className='mt-16 mx-auto'>
              <Button onClick={() => router.back()} theme={theme} darkMode={darkMode}>
                <div className='text-2xl flex items-center gap-4'>
                  <AiOutlineRollback />
                  <span className='font-ubuntu font-bold'>Back</span>
                </div>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute w-full md:w-1/3 h-full top-0 right-0  -z-10">
        <div className={`absolute w-full h-full inset-0 bg-gradient-to-r z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
        <Bg
          alt="landing pattern"
          src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
          className="opacity-100"
        />
        <div className={`absolute w-full h-full inset-0 bg-gradient-to-t z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {

  const { Doc } = context.query;
  let serverData = null

  const options = {
    method: 'POST',
    url: process.env.NEXT_PUBLIC_GET_DOC_API,
    params: {
      apiKey: process.env.NEXT_PUBLIC_DB_KEY
    },
    headers: { 'Content-Type': 'application/json' },
    data: { name: Doc }
  };

  await axios.request(options).then((response) => {
    serverData = response.data;
  }).catch((error) => {
    console.error(error);
  });


  serverData = { ...serverData, id: serverData['_id'] }
  delete serverData['_id']

  return { props: { project: serverData } }
}

export default Doc