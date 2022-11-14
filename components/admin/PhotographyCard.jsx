import { useState } from 'react'
import axios from "axios";
import Image from 'next/image'
import { MdAutoDelete } from 'react-icons/md'
import PopupError from '../tools/PopupError';


const PhotographyCard = ({ data, resetImgDb }) => {

  const [Error, setError] = useState(null)

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
      const s = status.toString()
      if(s === '400') {
        setError(data.error)
        console.error(error);
      } else if (s === '422') {
        setError(data.badRequest)
        console.error(error);
      } else {
        setError('Check Console')
        console.log(error)
      }
    }).finally(() => {
      resetImgDb()
    })
  }

  if(Error) {
    return (
      <PopupError errors={Error} setErrors={setError}/>
    )
  }

  return (
    <section className='w-fit h-fit relative flex p-1 border border-slate-800 rounded-sm'>
      <Image src={data.url} height='360px' width='265px' alt='image.png' className='rounded-sm'/>
      <button onClick={deletePhotography} className='absolute top-4 right-2 text-4xl text-pink-600'>
        <MdAutoDelete />
      </button>
    </section>
  )
}

export default PhotographyCard