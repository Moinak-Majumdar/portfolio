import React, { useState } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../../src/Firebase'
import { useRouter } from 'next/router';
import { MdAddTask, MdOutlineClose, MdLinkedCamera } from 'react-icons/md'
import { RiUploadCloud2Fill, RiDatabase2Fill, RiFileListFill } from 'react-icons/ri'
import Button from '../tools/Button'

const works = [
  {
    name: 'All Projects',
    url: '/admin',
    className: 'text-teal-400',
    target: false,
    icon: <RiDatabase2Fill />
  },
  {
    name: 'Add Project',
    url: '/admin/AddDoc',
    className: 'text-green-400',
    target: false,
    icon: <MdAddTask />
  },
  {
    name: 'Photography',
    url: '/admin/Photography',
    className: 'text-orange-400',
    target: false,
    icon: <MdLinkedCamera/>
  },
  {
    name: 'Image Cloud',
    url: '/admin/ImageCloud',
    className: 'text-amber-400',
    target: '_blank',
    icon: <RiUploadCloud2Fill/>
  },
]
const DashboardNavbar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  function navigate(url) {
    router.push(url)
  }

  function logout () {
    signOut(auth).then(() => {
      navigate('/admin')
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <>
      <section className='fixed top-[10px] left-0 md:left-2 flex justify-center items-center p-[6px] bg-gradient-to-br via-violet-800 from-indigo-800 to-slate-900 rounded-full z-30'>
        <button onClick={() => setIsOpen(!isOpen)} className='text-3xl text-pink-600'>
          <RiFileListFill />
        </button>
      </section>
      {isOpen && <section className='fixed top-40 left-0 p-4 text-xl w-full md:w-60 overflow-hidden h-fit z-30 pb-4 rounded-lg bg-gradient-to-br via-violet-800 from-indigo-800 to-slate-900'>
        <MdOutlineClose className='absolute top-1 right-1 text-2xl text-pink-600' onClick={() => setIsOpen(!isOpen)}/>
        {works.map((curr, index) => {
          return (
            <div className={`my-2 w-full flex items-center px-2 ${curr.className} hover:scale-95 ease-in-out`} key={index}>
              {curr.icon}
              <button onClick={() => navigate(curr.url)} href={curr.url}>
                <a className='ml-2' target={curr.target}>{curr.name}</a>
              </button>
            </div>
          )
        })}
        <Button type="button" onClick={logout} theme={{ val: '#FF008E' }} className='mt-4'>Sign Out</Button>
      </section>}
    </>
  )
}

export default DashboardNavbar