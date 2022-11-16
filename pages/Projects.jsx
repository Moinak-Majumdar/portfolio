import axios from 'axios'
import MyProjects from '../components/home/MyProjects'
import MyWorks from '../components/home/MyWorks'

const Projects = ({darkMode, theme, Work, Project}) => {
  return (
    <>
        <MyWorks darkMode={darkMode} theme={theme} Work={Work}/>
        <MyProjects darkMode={darkMode} theme={theme} Project={Project}/>
    </>
  )
}

export async function getServerSideProps() {
  let Work, Project
  const optWork = {
    method: 'POST',
    url: process.env.NEXT_PUBLIC_GET_ALL_DOC_API,
    params: {
      apiKey: process.env.NEXT_PUBLIC_DB_KEY
    },
    headers: { 'Content-Type': 'application/json' },
    data: { type: 'work' }
  };
  const optProject = {
    method: 'POST',
    url: process.env.NEXT_PUBLIC_GET_ALL_DOC_API,
    params: {
      apiKey: process.env.NEXT_PUBLIC_DB_KEY
    },
    headers: { 'Content-Type': 'application/json' },
    data: { type: 'project' }
  };
  await axios.request(optWork).then((response) => {
    Work = response.data
  }).catch((error) => {
      console.log(error)
  })
  await axios.request(optProject).then((response) => {
    Project = response.data
  }).catch((error) => {
    console.log(error)
  })
  
  return {props: {Work: Work, Project: Project}}
}

export default Projects