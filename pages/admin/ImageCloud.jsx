import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../src/Firebase'
import DashboardNavbar from '../../components/admin/DashboardNavbar'
import Button from '../../components/tools/Button'
import Input from '../../components/tools/Input'
import Head from 'next/head'
import { FaRegWindowClose, FaClipboardCheck, FaFileUpload } from 'react-icons/fa'
import { BsFillImageFill } from 'react-icons/bs'
import { MdOutlineWarning, MdOutlineHighlightOff } from 'react-icons/md'
import CloudImgCard from '../../components/admin/CloudImgCard';
import axios from 'axios'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../src/Firebase';
import Login from '../../components/admin/Login';
import Loading from '../../components/admin/Loading';
import Err from '../../components/admin/Err';

const ImageCloud = ({ darkMode, theme, imagesFromDb }) => {

    const [uploadBox, setUploadBox] = useState(false)
    const [ansLink, setAnsLink] = useState(null)
    const [copied, setCopied] = useState(false)
    const [Error, setError] = useState(null)
    const [projectName, setProjectName] = useState('')
    const [file, setFile] = useState(null)
    const [msg, setMsg] = useState(null)
    const [disable, setDisable] = useState(false)
    const [dbImages, setDbImages] = useState(imagesFromDb)

    const [user, loading, error] = useAuthState(auth);

    async function reDownloadImages() {
        let images = []
        const options = {
            method: 'GET',
            url: process.env.NEXT_PUBLIC_GET_ALL_CLOUD_IMG,
            params: {
                apiKey: process.env.NEXT_PUBLIC_DB_KEY
            },
            headers: { 'Content-Type': 'application/json' }
        };
        await axios.request(options).then((response) => {
            images = [...response.data]
        }).catch((error) => {
            const status = error.response.status;
            const data = error.response.data;
            switch (status.toString()) {
                case '400': {
                    setError(data.error)
                    console.log(error);
                    break;
                }
                case '420': {
                    setError(data.badRequest)
                    console.log(error);
                    break;
                }
                default: {
                    setError('Check Console')
                    console.log(error)
                }
            }
        }).finally(() => {
            setDbImages(images)
        })
    }

    function handelSubmit(e) {
        e.preventDefault();

        setMsg('')
        setDisable(true)
        const fileName = `${projectName}_${file.name}`
        const storageRef = ref(storage, `${projectName}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                switch (snapshot.state) {
                    case 'paused':
                        setMsg('Upload is paused 😠💢');
                        break;
                    case 'running':
                        setMsg('Upload is running 🚴🚴');
                        break;
                    default:
                        break;
                }
            },
            (err) => {
                setMsg(false)
                alert(err);
                setDisable(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setAnsLink(downloadURL)
                    manageFile({ url: downloadURL, fileName, projectName })
                })
            })
    }
    async function manageFile(args) {
        const options = {
            method: 'POST',
            url: process.env.NEXT_PUBLIC_ADD_CLOUD_IMG,
            params: {
                apiKey: process.env.NEXT_PUBLIC_DB_KEY
            },
            data: {
                url: args.url,
                imgName: args.fileName,
                projectName: args.projectName
            },
            headers: { 'Content-Type': 'application/json' }
        };

        await axios.request(options).then((response) => {
            const status = response.status;
            const data = response.data;
            if (status.toString() === '201') {
                setError(data.success)
            }
        }).catch((error) => {
            const status = error.response.status;
            const data = error.response.data;
            switch (status.toString()) {
                case '400': {
                    setError(data.error)
                    console.log(error);
                    break;
                }
                case '420': {
                    setError(data.badRequest)
                    console.log(error);
                    break;
                }
                default: {
                    setError('Check Console')
                    console.log(error)
                }
            }
        }).finally(() => {
            reDownloadImages()
            setDisable(false)
        })
    }

    if (user) {
        return (
            <>
                <Head>
                    <title>Image Cloud ☁️☁️☁️☁️</title>
                </Head>
                <DashboardNavbar />
                <section className={`fixed top-40 right-0 p-2 w-full md:w-80 overflow-hidden h-fit transition-transform transform z-30 pb-4 rounded-lg ${darkMode ? "bg-slate-800 text-gray-300" : 'bg-slate-300 text-gray-800'} ${uploadBox ? 'translate-x-0' : 'translate-x-full'}`}>
                    <FaRegWindowClose className='absolute top-0 right-2 text-2xl m-1 cursor-pointer' onClick={() => setUploadBox(!uploadBox)} />
                    {msg && <div className='mx-4 px-4 py-2 rounded-lg mt-6'>{msg}</div>}
                    <form onSubmit={handelSubmit} className='p-4 flex flex-col'>
                        <div className='flex flex-col'>
                            <label htmlFor='project-name'>Project Name</label>
                            <Input id='project-name' autoComplete='project-name' theme={theme} onChange={(e) => setProjectName(e.target.value)} value={projectName} required={true} type="text" darkMode={darkMode} disable={disable} />
                            <label htmlFor='file' className='mt-2'>Select File</label>
                            <input type='file' accept="image/*" id='file' onChange={(e) => { setFile(e.target.files[0]) }} disabled={disable} required />
                        </div>
                        <Button type='submit' theme={theme} className='mt-4' disable={disable}>
                            <div className='flex justify-center items-center'>
                                <FaFileUpload />
                                <span className='ml-2'>Upload</span>
                            </div>
                        </Button>
                    </form>
                    {ansLink && <div className='mx-4 flex flex-col'>
                        <h1 style={{ fontSize: '12px' }}>{ansLink}</h1>
                        <CopyToClipboard text={ansLink}>
                            <button onClick={() => setCopied(!copied)} className='flex mt-2 p-2 justify-center items-center bg-violet-500 hover:bg-violet-600 ease-in-out rounded-lg'>
                                <span className='mr-3 text-xl'>{copied ? 'Link Copied' : 'Copy to clipboard'}</span>
                                <FaClipboardCheck className='text-3xl my-auto cursor-pointer' />
                            </button>
                        </CopyToClipboard>
                    </div>}
                </section>
                <section className='myContainer py-[4rem] text-gray-800'>
                    <button className='fixed top-14 md:left-2 left-0 flex flex-col md:flex-row justify-center items-center p-2 mb-4 z-10 rounded-lg bg-green-300' onClick={() => setUploadBox(!uploadBox)}>
                        <BsFillImageFill style={{ fontSize: '30px', cursor: 'pointer' }} />
                        <span className='text-lg hidden md:flex ml-2 cursor-pointer'>Upload image</span>
                    </button>
                    <div className='mt-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8'>
                        {dbImages.map((curr) => {
                            return (
                                <CloudImgCard key={curr.projectName}
                                    data={curr}
                                    reDownloadImages={reDownloadImages}
                                />
                            )
                        })}
                    </div>
                </section>
            </>
        )
    }
    if (Error) {
        return (
            <div className='fixed top-0 left-0 flex min-w-full justify-center items-center min-h-screen z-10'>
                <div className='py-2 px-4 bg-orange-500 rounded-full w-fit flex items-center text-xl shadow-2xl shadow-orange-400'>
                    <MdOutlineWarning className='text-3xl' />
                    <h1 className='mx-2'>{Error}</h1>
                    <MdOutlineHighlightOff className='cursor-pointer text-3xl' onClick={() => setError(null)} />
                </div>
            </div>
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
    return (
        <>
            <Login darkMode={darkMode} theme={theme} />
        </>
    )
}

export async function getServerSideProps() {

    let images = []
    const options = {
        method: 'GET',
        url: process.env.NEXT_PUBLIC_GET_ALL_CLOUD_IMG,
        params: {
            apiKey: process.env.NEXT_PUBLIC_DB_KEY
        },
        headers: { 'Content-Type': 'application/json' }
    };

    await axios.request(options).then((response) => {
        images = [...response.data]
    }).catch((error) => {
        console.error(error);
    });

    return { props: { imagesFromDb: images } }
}

export default ImageCloud