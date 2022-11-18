import MyProjects from '../components/home/MyProjects'
import MyWorks from '../components/home/MyWorks'
import Footer from '../components/layout/Footer'

const Projects = ({darkMode, theme }) => {
  return (
    <>
        <MyWorks darkMode={darkMode} theme={theme} />
        <MyProjects darkMode={darkMode} theme={theme}/>
        <Footer darkMode={darkMode}/>
    </>
  )
}


export default Projects