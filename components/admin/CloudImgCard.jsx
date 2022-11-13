import { useState } from 'react'
import Image from 'next/image'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ref, deleteObject } from "firebase/storage";
import { storage } from '../../src/Firebase';
import axios from "axios";
import { FaClipboardCheck, FaCheckDouble, FaTrashAlt } from 'react-icons/fa'
import { MdOutlineHighlightOff, MdOutlineWarning } from 'react-icons/md'


const CloudImgCard = ({ data, reDownloadImages }) => {

  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)

  async function deleteImage() {
    const ack = prompt("Confirm project Name to delete : " + data.imgName)

    if (ack === data.projectName) {
      const options = {
        method: 'DELETE',
        url: process.env.NEXT_PUBLIC_DELETE_CLOUD_IMG,
        params: {
          apiKey: process.env.NEXT_PUBLIC_DB_KEY
        },
        headers: { 'Content-Type': 'application/json' },
        data: {
          url: data.url
        }
      };
      await axios.request(options).then((response) => {
        const status = response.status;
        const d = response.data;
        if (status.toString() === '200') {
          const desertRef = ref(storage, `${data.projectName}/${data.imgName}`);
          deleteObject(desertRef).then(async () => {
            setError(d.success)
            await reDownloadImages()
          }).catch((error) => {
            alert("Failed to delete 😠😠😠")
            console.log(error)
          });
        }
      }).catch((error) => {
        const status = error.request.status;
        const d = error.response.data;
        switch (status.toString()) {
          case '400': {
            setError(d.error)
            console.error(error);
            break;
          }
          case '420': {
            setError(d.badRequest)
            console.error(error);
            break;
          }
          default: {
            setError('Check Console')
            console.log(error)
          }
        }
      }).finally(() => {
        setError(null)
      })
    } else {
      setError("Project Name Mismatched ⛔⛔⛔")
    }
  }

  
  if (error) {
    return (
      <div className='fixed inset-0 flex min-w-full justify-center items-center min-h-screen z-10'>
        <div className='py-2 px-4 bg-orange-500 rounded-full w-fit flex items-center text-xl shadow-2xl shadow-orange-400'>
          <MdOutlineWarning className='text-3xl' />
          <h1 className='mx-2'>{error}</h1>
          <MdOutlineHighlightOff className='cursor-pointer text-3xl' onClick={() => setError(null)} />
        </div>
      </div>
    )
  }

  return (
    <section className='w-fit h-fit relative flex flex-col rounded-lg p-2 overflow-hidden bg-gradient-to-br from-pink-300 via-cyan-300 to-teal-400 text-gray-800'>
      <h1 className='font-roboto text-sm'>{`Project Name: ${data.projectName}`}</h1>
      <Image src={data.url} height='200px' width='256px' alt='image.png' />
      <h1 className='font-roboto text-sm'>{data.imgName}</h1>
      <CopyToClipboard text={data.url}>
        <button onClick={() => setCopied(!copied)} className='flex mt-2 p-2 justify-center items-center bg-orange-300 hover:bg-orange-400 rounded-lg'>
          <span className='mr-3 text-lg'>{copied ? 'Link Copied' : 'Copy Link to clipboard'}</span>
          {copied ? <FaCheckDouble className='text-2xl my-auto cursor-pointer' /> : <FaClipboardCheck className='text-3xl my-auto cursor-pointer' />}
        </button>
      </CopyToClipboard>
      <button onClick={deleteImage} className='absolute top-10 right-4 bg-red-400 rounded-full p-2 text-lg cursor-pointer'>
        <FaTrashAlt />
      </button>
    </section>
  )
}

export default CloudImgCard