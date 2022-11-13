import { useState } from 'react'
import axios from "axios";
import Image from 'next/image'
import { MdAutoDelete, MdOutlineHighlightOff, MdOutlineWarning} from 'react-icons/md'


const PhotographyCard = ({ data, resetImgDb }) => {

  const [error, setError] = useState(null)

  async function deletePhotography() {
    const options = {
      method: 'DELETE',
      url: process.env.NEXT_PUBLIC_DELETE_PHOTOGRAPHY_API,
      params: {
        apiKey: process.env.NEXT_PUBLIC_DB_KEY
      },
      data: {
        url: data.url
      },
      headers: { 'Content-Type': 'application/json' }
    };

    await axios.request(options).then((response) => {
      const status = response.status;
      if (status.toString() === '200') {
        setError('Photography delete from db but not from storage')
      }
    }).catch((error) => {
      const status = error.response.status;
      const data = error.response.data;
      switch (status.toString()) {
        case '400': {
          setError(data.error)
          console.error(error);
          break;
        }
        case '420': {
          setError(data.badRequest)
          console.error(error);
          break;
        }
        default: {
          setError('Check Console')
          console.log(error)
        }
      }
    }).finally(() => {
      resetImgDb()
    })
  }

  if (error) {
    return (
      <div className='fixed top-0 left-0 flex min-w-full justify-center items-center min-h-screen z-10'>
        <div className='py-2 px-4 bg-orange-500 rounded-full w-fit flex items-center text-xl shadow-2xl shadow-orange-400'>
          <MdOutlineWarning className='text-3xl' />
          <h1 className='mx-2'>{error}</h1>
          <MdOutlineHighlightOff className='cursor-pointer text-3xl' onClick={() => setError(null)} />
        </div>
      </div>
    )
  }


  return (
    <section className='w-fit h-fit relative flex p-1 border border-slate-800'>
      <Image src={data.url} height='360px' width='265px' alt='image.png' />
      <button onClick={deletePhotography} className='absolute top-4 right-2 text-4xl text-pink-600'>
        <MdAutoDelete />
      </button>
    </section>
  )
}

export default PhotographyCard