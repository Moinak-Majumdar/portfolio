import Head from 'next/head'
import Bg from "../../components/tools/Bg";
import AnimatedHeading from '../../components/tools/AnimatedHeading'
import { GetServerSidePropsContext } from 'next';
import { useFont } from '@/context/FontProvider';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import DevFlag from '@/components/others/DevFlag';
import Button from '@/components/tools/Button';
import {BsArrowBarRight} from 'react-icons/bs'
import { useRouter } from 'next/router';
import Ring from '@/components/others/Ring';


const Doc = ({Data}: {Data: string}) => {

  
  const { roboto, ubuntu, poppins, } = useFont();
  const darkMode = useSelector((s: RootState) => s.darkMode.mode);
  const theme = useSelector((s: RootState) => s.colorTheme);
  const router = useRouter();

  const devFlag:boolean = process.env.NEXT_PUBLIC_DEV_FLAG == 'yes' ? true : false;

  return (
    <>
      {devFlag && <DevFlag />}
      <Head>
        <meta property='og:title' content={`Moinak Majumdar | Details`} />
        <title>{`Moinak Majumdar | Details`}</title>
      </Head>
      <section className={`relative max-h-screen overflow-hidden ${darkMode ? 'bg-gradient-to-t from-slate-900' : ''}`}>
        <div className={`myContainer flex justify-center items-center min-h-screen  ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
          <div className={`p-6 rounded-md backdrop-blur-sm bg-transparent ${darkMode ? 'bg-slate-900/5' : 'md:bg-slate-300/5'}`}>
            <AnimatedHeading classList="mt-8 uppercase text-3xl" title='Page Replaced' />
          <article style={roboto.style}>
            <h1 style={poppins.style} className='text-2xl font-semibold'>Can&apos;t find web project?</h1>  
            <p  className='text-xl mt-4'>
              Page <span style={{color: theme.val}} className='italic '>Doc</span>  is replaced with Page <span style={{color: theme.val}} className='italic '>Web</span>. Eg,
            </p>
            <p className='mt-4'>For page 
              <span className={`font-semibold p-1 mx-1 rounded-md ${darkMode ? 'bg-gray-800': 'bg-gray-200'}`} style={{color: theme.val}}>{`/Doc/${Data}`}</span> 
              is now replaced with 
              <span className={`font-semibold p-1 mx-1 rounded-md ${darkMode ? 'bg-gray-800': 'bg-gray-200'}`} style={{color: theme.val}}>{`/Web/${Data}`}</span>
            </p>
          </article>
          <Button className='mt-8' onClick={() => router.push(`/${Data}`, `/Web/${Data}`, {shallow: true})}>
            <div className='flex w-full justify-center items-center'>
              <p className='mr-4 ' style={roboto.style}>Redirect Now</p>
              <BsArrowBarRight className='text-xl'/>
            </div>
          </Button>
          </div>
        </div>
        <Ring darkMode={darkMode}/>
        <div className="absolute w-full md:w-1/3 h-full top-0 left-0 -z-40">
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

  const { Doc } = context.query;

  if(Doc != null) {
    return {
      redirect: { permanent: true, destination: `Web/${Doc}` }
    }
  }

  return {props: {Data: Doc}};

}


export default Doc