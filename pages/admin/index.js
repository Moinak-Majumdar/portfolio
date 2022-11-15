import DashboardNavbar from '../../components/admin/DashboardNavbar'
import axios from "axios";
import DocCard from '../../components/admin/DocCard';
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../src/Firebase';
import Login from '../../components/admin/Login';
import Loading from '../../components/admin/Loading';
import Err from '../../components/admin/Err';

const landing = ({ darkMode, theme, projects }) => {

  const [user, loading, error] = useAuthState(auth);
  
  if(loading) {
    return(
      <Loading darkMode={darkMode}/>
    )
  }
  if(error) {
    return(
      <Err darkMode={darkMode} error={error}/>
    )
  }
  if(user) {
    return (
      <>
        <Head>
          <title>My babies 😈😈😈</title>
        </Head>
        <DashboardNavbar />
        <section className={`myContainer py-[4rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
          <div className='md:p-2 mt-8 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 '>
            {projects.map((curr, i) => {
              return (
                <DocCard key={i} data={curr} darkMode={darkMode} />
              )
            })}
          </div>
        </section>
      </>
    )
  }
  return(
    <>
      <Login darkMode={darkMode} theme={theme}/>
    </>
  )
}

export async function getServerSideProps() {

  let projects = []
  const option1 = {
    method: 'POST',
    url: process.env.NEXT_PUBLIC_GET_ALL_DOC_API,
    params: {
      apiKey: process.env.NEXT_PUBLIC_DB_KEY
    },
    headers: { 'Content-Type': 'application/json' },
    data: { type: 'project' }
  };
  const option2 = {
    method: 'POST',
    url: process.env.NEXT_PUBLIC_GET_ALL_DOC_API,
    params: {
      apiKey: process.env.NEXT_PUBLIC_DB_KEY
    },
    headers: { 'Content-Type': 'application/json' },
    data: { type: 'work' }
  };
  
  await axios.request(option1).then((response) => {
    projects = response.data
  }).catch((error) => {
    console.error(error);
  });

  await axios.request(option2).then((response) => {
    projects = [...projects, ...response.data]
  }).catch((error) => {
    console.error(error);
  });

  return { props: { projects: projects } }
}

export default landing