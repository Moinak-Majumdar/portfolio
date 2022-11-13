import axios from "axios";
import ProjectImgSlider from "../../components/others/ProjectImgSlider";
import Bg from "../../components/tools/Bg";
import { motion } from 'framer-motion'
import { FaGithub, FaLink, FaGripfire, FaRegImages } from 'react-icons/fa'
import Image from "next/image";

const Doc = ({ project, darkMode, theme }) => {

  const images = [...project.img]
  
  return (
    <section className={`relative min-h-screen ${darkMode ? 'bg-gradient-to-t from-slate-900' : ''}`}>
      <div className={`myContainer py-[4rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        <h4 className="mt-8 uppercase">
          {project.type === 'project' ? 'about project' : 'about work'}
        </h4>
        <h1 className="font-ubuntu font-bold lg:text-5xl text-4xl capitalize">{project.name}</h1>
        <div className="flex flex-col">
          <section className="flex lg:flex-row justify-center lg:justify-between flex-col-reverse w-full">
            {/* hl5 description */}
            <motion.div
              initial={{y:100, x:-100, opacity:0}}
              animate={{y:0, x:0, opacity:1}}
              transition={{duration: 1, delay: 0.8}}  
              className="text-lg md:text-xl lg:max-w-2xl 2xl:max-w-3xl py-4 mr-4"
              dangerouslySetInnerHTML={{__html: project.description}}>
            </motion.div>
            <motion.div
              initial={{y: -100, x:100, opacity: 0}}
              animate={{x:0, y:0, opacity: 1}}
              transition={{duration: 1.2, delay: 0.5}} 
              className="w-fit flex flex-col">
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
          </section>
          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:1, delay:2}}
            className="mx-auto flex flex-col mt-10 w-full">
            <div className="ml-6 mb-4 flex items-center text-2xl md:text-3xl">
              <FaRegImages className="text-4xl" style={{ color: theme.val }} />
              <h1 className='font-ubuntu ml-2'>Some
                <span className="ml-2 font-ubuntu font-bold">Screenshots</span>
              </h1>
            </div>
            <ProjectImgSlider images={images} theme={theme} />
          </motion.div>
        </div>
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