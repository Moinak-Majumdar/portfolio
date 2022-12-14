import { useState } from 'react'
import DashboardNavbar from '../../components/admin/DashboardNavbar'
import axios from "axios";
import Input from '../../components/tools/Input'
import Textarea from '../../components/tools/Textarea'
import { MdAddTask, MdRestoreFromTrash } from 'react-icons/md'
import Image from 'next/image'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../src/Firebase';
import Login from '../../components/admin/Login';
import Loading from '../../components/admin/Loading';
import Err from '../../components/admin/Err';
import PopupError from '../../components/tools/PopupError';

const AddProject = ({ darkMode, theme }) => {

  const [disable, setDisable] = useState(false)
  const [Error, setError] = useState(null)
  const [data, setData] = useState({ name: '', type: '', status : '',intro: '', role: '', liveUrl: '', gitRepo: '', description: '', img: [], tools: '', toolsLogo: '' })
  const [imgFields, setImgFields] = useState([{ url: '' }])
  const [toolsFields, setToolsFields] = useState([{ name: '' }])

  const [user, loading, error] = useAuthState(auth);

  function handleChange(index, event, option) {
    if (option === 'img') {
      let temp = [...imgFields];
      temp[index][event.target.name] = event.target.value;
      setImgFields(temp);
    }
    if (option === 'tools') {
      let temp = [...toolsFields];
      temp[index][event.target.name] = event.target.value;
      setToolsFields(temp);
    }
  }
  function addFiled(option) {
    if (option === 'img') {
      let newField = { url: '' }
      setImgFields([...imgFields, newField])
    }
    if (option === 'tools') {
      let newField = { url: '' }
      setToolsFields([...toolsFields, newField])
    }
  }
  function removeField(index, option) {
    if (option === 'img') {
      let temp = [...imgFields];
      temp.splice(index, 1)
      setImgFields(temp)
    }
    if (option === 'tools') {
      let temp = [...toolsFields];
      temp.splice(index, 1)
      setToolsFields(temp)
    }
  }

  async function handelSubmit(e) {
    e.preventDefault();

    setDisable(true)
    setError('')

    let imgArr = []
    imgFields.forEach((curr) => {
      imgArr.push(curr.url)
    })

    let toolsArr = [];
    toolsFields.forEach((curr) => {
      toolsArr.push(curr.name)
    })

    let toolsLogoArr = []
    toolsArr.forEach((curr) => {
      toolsLogoArr.push(`${curr}.svg`)
    })

    if (toolsArr.length < 1) {
      setDisable(false)
      return setError('Project was made without anything?? 🤦🤦🤦')
    }

    if (imgArr.length < 1) {
      setDisable(false)
      return setError('At least one image is required.')
    }


    const options = {
      method: 'POST',
      url: process.env.NEXT_PUBLIC_ADD_DOC_API,
      params: {
        apiKey: process.env.NEXT_PUBLIC_DB_KEY
      },
      headers: { 'Content-Type': 'application/json' },
      data: {
        name: data.name, type: data.type, status: data.status, role: data.role, intro: data.intro, liveUrl: data.liveUrl, gitRepo: data.gitRepo, slug: data.name, description: data.description, img: imgArr, tools: toolsArr, toolsLogo: toolsLogoArr
      }
    };
    await axios.request(options).then((response) => {
      const status = response.status;
      const data = response.data;
      if (status.toString() === '201') {
        setError(data.success)
      }
    }).catch((error) => {
      const status = error.response.status;
      const s = status.toString()
      const data = error.response.data;
      if (s === '400' || s === '422' || s === '500') {
        setError(data.error)
        console.log(error);
      } else if (s === '420') {
        setError(data.badRequest)
        console.log(error);
      } else {
        setError('Check Console')
        console.log(error)
      }
    }).finally(() => {
      setDisable(false)
    })

  }

  if (Error) {
    return (
      <PopupError errors={Error} setErrors={setError} />
    )
  }
  if (loading) {
    return (
      <Loading darkMode={darkMode} />
    )
  }
  if (error) {
    return (
      <Err darkMode={darkMode} error={error} />
    )
  }

  if (user) {
    return (
      <>
        <Head>
          <title>Add a new Document 😃😃😃</title>
        </Head>
        <DashboardNavbar />
        <section className={`myContainer py-[4rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
          <form onSubmit={handelSubmit} className='md:p-2 mt-8 mx-auto grid grid-cols-4 2xl:grid-cols-8 gap-4'>
            <div className='col-span-4 2xl:col-span-2'>
              <label className='text-sm md:text-base font-bold' htmlFor='project-name'>Project Name **</label>
              <Input id='project-name' autoComplete='project-name' theme={theme} onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} required={true} type="text" darkMode={darkMode} disable={disable} />
              <h3 className='text-sm text-pink-600'>Be Careful: Can not be updated after submit.</h3>
            </div>
            <div className='col-span-4 2xl:col-span-2 flex flex-col'>
              <label className='text-sm md:text-base font-bold'>Type **</label>
              <div className='flex mt-2 gap-6'>
                <span>
                  <input id='client-work' value='work' onChange={(e) => setData({ ...data, type: 'work' })} name='type' required={true} type="radio" disable={disable} />
                  <label className='text-sm font-bold md:text-base ml-2 cursor-pointer' htmlFor='client-work' style={{ color: theme.val }}>Client Work</label>
                </span>
                <span>
                  <input id='personal-project' value='project' onChange={(e) => setData({ ...data, type: 'project' })} name='type' required={true} type="radio" disable={disable} />
                  <label className='text-sm font-bold md:text-base ml-2 cursor-pointer' htmlFor='personal-project' style={{ color: theme.val }}>Personal Project</label>
                </span>
              </div>
            </div>
            <div className='col-span-4 2xl:col-span-2 flex flex-col'>
              <label className='text-sm md:text-base font-bold'>Current Status **</label>
              <div className='flex mt-2 gap-6'>
                <span>
                  <input id='status-done' value='completed' onChange={(e) => setData({ ...data, status: 'completed' })} name='status' required={true} type="radio" disable={disable} />
                  <label className='text-sm font-bold md:text-base ml-2 cursor-pointer' htmlFor='status-done' style={{ color: theme.val }}>Completed</label>
                </span>
                <span>
                  <input id='status-running' value='under development' onChange={(e) => setData({ ...data, status: 'under development' })} name='status' required={true} type="radio" disable={disable} />
                  <label className='text-sm font-bold md:text-base ml-2 cursor-pointer' htmlFor='status-running' style={{ color: theme.val }}>Under Development</label>
                </span>
              </div>
            </div>
            <div className='col-span-4 2xl:col-span-2'>
              <label className='text-sm md:text-base font-bold' htmlFor='Live-url'>Live project Url</label>
              <Input id='Live-url' autoComplete='Live-url' theme={theme} onChange={(e) => setData({ ...data, liveUrl: e.target.value })} value={data.liveUrl} required={true} type="text" darkMode={darkMode} disable={disable} placeholder='Deployment url' />
            </div>
            <div className='col-span-4'>
              <label className='text-sm md:text-base font-bold' htmlFor='git-repositories'>Project Repositories</label>
              <Input id='git-repositories' autoComplete='git-repositories' theme={theme} onChange={(e) => setData({ ...data, gitRepo: e.target.value })} value={data.gitRepo} required={true} type="text" darkMode={darkMode} disable={disable} placeholder='Git repositories link' />
            </div>
            <div className='col-span-4'>
              <label className='text-sm md:text-base font-bold' htmlFor='project-role'>Project Role</label>
              <Input id='project-role' autoComplete='project-role' onChange={(e) => setData({ ...data, role: e.target.value })} value={data.role} required={true} type="text" theme={theme} darkMode={darkMode} disable={disable} placeholder='Eg: design and development.' />
            </div>
            <div className='col-span-full'>
              <label className='text-sm md:text-base font-bold' htmlFor='project-intro'>Project Introduction</label>
              <Input id='project-intro' autoComplete='project-intro' onChange={(e) => setData({ ...data, intro: e.target.value })} value={data.intro} required={true} type="text" theme={theme} darkMode={darkMode} disable={disable} placeholder='Small Introduction' />
            </div>
            <div className='col-span-full'>
              <label className='text-sm md:text-base font-bold' htmlFor='project-description'>Project Description</label>
              <Textarea id='project-description' autoComplete='project-description' onChange={(e) => setData({ ...data, description: e.target.value })} value={data.description} required={true} type="text" theme={theme} darkMode={darkMode} disable={disable} placeholder='Note: Use <br/> tag to add new line at final representation view.' />
            </div>
            <div className='col-span-full flex'>
              <h1 className='text-indigo-500'>Used language/framework/tools. Minimum one is required. (ps: add them all, it nos showcase time.) Another one ?</h1>
              <span className='ml-1 text-pink-600 hover:text-cyan-400 hover:underline cursor-pointer' onClick={() => addFiled('tools')}>Click Here</span>
            </div>
            {toolsFields.map((curr, index) => {
              return (
                <div key={index} className='col-span-2 md:col-span-1  flex w-full'>
                  <Input autoComplete='language/framework' theme={theme} required={true} type="text"
                    darkMode={darkMode} disable={disable} placeholder='I used? 🤔' name='name'
                    value={curr.name}
                    onChange={event => handleChange(index, event, 'tools')}
                  />
                  <span onClick={() => removeField(index, 'tools')} className={`ml-2 mt-auto text-3xl text-red-600 hover:text-pink-400 ${disable ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                    <MdRestoreFromTrash />
                  </span>
                </div>
              )
            })}
            <div className='col-span-full flex'>
              <h1 className='text-indigo-500'>Project Images/screenshot. Minimum one is required. Another one ?</h1>
              <span className='ml-1 text-pink-600 hover:text-cyan-400 hover:underline cursor-pointer' onClick={() => addFiled('img')}>Click Here</span>
            </div>
            {imgFields.map((input, index) => {
              return (
                <div key={index} className='col-span-4 flex w-full'>
                  <Image src={input.url} height='112px' width='160px' alt='dummy' className='rounded-md' />
                  <div className='flex flex-col w-full ml-1'>
                    <Textarea autoComplete='off' theme={theme} required={true} type="text"
                      darkMode={darkMode} disable={disable} placeholder='Project Image Url.' name='url'
                      value={input.url}
                      onChange={event => handleChange(index, event, 'img')}
                    />
                  </div>
                  <span onClick={() => removeField(index, 'img')} className={`ml-2 mt-auto text-3xl text-red-600 hover:text-pink-400 ${disable ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                    <MdRestoreFromTrash />
                  </span>
                </div>
              )
            })}
            <div className='col-span-full flex justify-center items-center'>
              <button type='submit' className="px-5 py-2.5 relative rounded group font-medium text-white text-lg inline-block">
                <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-500 ease-in-out rounded shadow-2xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-xl from-purple-600 to-blue-500"></span>
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                <div className="relative flex items-center">
                  <MdAddTask />
                  <span className='ml-2'>Add Project</span>
                </div>
              </button>
            </div>
          </form>
        </section>
      </>
    )
  }
  return (
    <Login darkMode={darkMode} theme={theme} />
  )

}

export default AddProject