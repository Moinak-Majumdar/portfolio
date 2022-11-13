import {useState} from 'react'
import Image from 'next/image'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { storage, db } from '../../src/Firebase';
import { FaClipboardCheck, FaCheckDouble, FaTrashAlt } from 'react-icons/fa'


const CloudImgCard = ({url, imgName, projectName, reDownloadImages}) => {

  const [copied, setCopied] = useState(false)

  function deleteImage () {
    const ack = prompt("Confirm project Name to delete : " + imgName)

    if(ack === projectName) {
      const desertRef = ref(storage, `${projectName}/${imgName}`);

      deleteObject(desertRef).then(async () => {
      await deleteDoc(doc(db, "Project Images", imgName));
      }).then(() => {
        alert('Image Deleted ✖️✖️')
        reDownloadImages()
      }).catch((error) => {
        alert("Failed to delete 😠😠😠")
        console.log(error)
      });
    } else {
      alert("Project Name Mismatched ⛔⛔⛔")
    }
  }

  return (
    <section className='w-fit h-fit relative flex flex-col rounded-lg p-2 overflow-hidden bg-gradient-to-br from-pink-300 via-cyan-300 to-teal-400 text-gray-800'>
      <h1 className='font-roboto text-sm'>{`Project Name: ${projectName}`}</h1>
      <Image src={url} height='200px' width='256px' alt='image.png'/>
      <h1 className='font-roboto text-sm'>{imgName}</h1>
      <CopyToClipboard text={url}>
        <button onClick={() => setCopied(!copied)} className='flex mt-2 p-2 justify-center items-center bg-orange-300 hover:bg-orange-400 rounded-lg'>
            <span className='mr-3 text-lg'>{copied? 'Link Copied':'Copy Link to clipboard'}</span>
            {copied? <FaCheckDouble className='text-2xl my-auto cursor-pointer'/> : <FaClipboardCheck  className='text-3xl my-auto cursor-pointer'/> }
        </button>
      </CopyToClipboard>
      <button onClick={deleteImage} className='absolute top-10 right-4 bg-red-400 rounded-full p-2 text-lg cursor-pointer'>
        <FaTrashAlt/>
      </button>
    </section>
  )
}

export default CloudImgCard