import MyProjects from '../components/home/MyProjects'
import MyWorks from '../components/home/MyWorks'

const Projects = ({darkMode, theme}) => {
  return (
    <>
        <MyWorks darkMode={darkMode} theme={theme}/>
        <MyProjects darkMode={darkMode} theme={theme}/>
    </>
  )
}

export default Projects