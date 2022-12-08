import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const DocCard = ({ data, darkMode }) => {
  return (
    <Link href={`admin/${data.name}`} >
      <a className='flex flex-col w-72 rounded-lg overflow-hidden h-fit relative cursor-pointer'>
        <div className='absolute top-2 left-2 py-1 px-2 bg-pink-300 z-10 rounded-full font-comicNeue'>
          {data.type}
        </div>
        <div className={`absolute top-2 right-2 py-1 px-2 z-10 rounded-full font-comicNeue ${data.status === 'completed' ? 'bg-green-400' : 'bg-red-400'}`}>
          {data.status}
        </div>
        <Image src={data.img[0]} width='288px' height='220px' className='transition transform-gpu duration-700 ease-in-out hover:scale-105' alt='image.png' />
        <div className={`flex flex-col p-2 ${darkMode ? 'text-gray-300 bg-slate-800' : 'text-gray-800 bg-slate-200'}`}>
          <h1>{`Project Name : ${data.name}`}</h1>
        </div>
      </a>
    </Link>
  )
}

export default DocCard