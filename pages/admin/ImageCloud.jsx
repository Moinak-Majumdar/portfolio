import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Head from 'next/head'
import { useState } from 'react'
import { FaRegWindowClose, FaClipboardCheck, FaFileUpload } from 'react-icons/fa'
import { BsFillImageFill } from 'react-icons/bs'
import { auth, storage } from '../../src/Firebase';
import DashboardNavbar from '../../components/admin/DashboardNavbar'
import Button from '../../components/tools/Button'
import Input from '../../components/tools/Input'
import CloudImgCard from '../../components/admin/CloudImgCard';
import Login from '../../components/admin/Login';
import Loading from '../../components/admin/Loading';
import Err from '../../components/admin/Err';
import PopupError from '../../components/tools/PopupError';

const ImageCloud = ({ darkMode, theme, imagesFromDb }) => {

    const [uploadBox, setUploadBox] = useState(false)
    const [ansLink, setAnsLink] = useState(null)
    const [copied, setCopied] = useState(false)
    const [Error, setError] = useState('Please select project first.')
    const [projectName, setProjectName] = useState('')
    const [file, setFile] = useState(null)
    const [msg, setMsg] = useState(null)
    const [disable, setDisable] = useState(false)
    const [DB, setDB] = useState(imagesFromDb)
    const [CurrentDb, setCurrentDb] = useState(null)

    const [user, loading, error] = useAuthState(auth);

    function dbSet(e) {
        const dbName = e.target.value;
        if(dbName !== 'select project') {
            setCurrentDb(null)
            setCurrentDb(DB[dbName])
            setError(null)
        } else {
            setError('Please select project first.')
            setCurrentDb(null)
        }
    }
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
            const s = status.toString()
            if (s === '400' || s === '500') {
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
            setDB(images)
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
            const s = status.toString()
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
            setMsg('Upload Successful ❤️')
            reDownloadImages()
            setDisable(false)
        })
    }
    if (Error) {
        return (
            <PopupError errors={Error} setErrors={setError} />
        )
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
                    <div className='fixed top-3 left-14 md:left-16 z-10'>
                        <select className="block w-full px-3 py-1.5 text-lg cursor-pointer text-gray-700 border border-orange-400 rounded transition ease-in-out focus:bg-white bg-orange-200 focus:border-orange-600 outline-none" aria-label="select project" onChange={dbSet}>
                            <option value='select project'>Select Project</option>
                            {imagesFromDb['allProjects'].map((curr, index) => {
                                return(
                                    <option key={index} value={curr}>{curr}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button className='fixed top-14 md:left-2 left-0 flex flex-col md:flex-row justify-center items-center p-2 mb-4 z-10 rounded-lg bg-green-300' onClick={() => setUploadBox(!uploadBox)}>
                        <BsFillImageFill style={{ fontSize: '30px', cursor: 'pointer' }} />
                        <span className='text-lg hidden md:flex ml-2 cursor-pointer'>Upload image</span>
                    </button>
                    {CurrentDb && <div className='mt-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8'>
                        {CurrentDb.map((curr, index) => {
                            return (
                                <CloudImgCard key={`${curr.projectName}-_-${index}`}
                                    data={curr}
                                    reDownloadImages={reDownloadImages}
                                />
                            )
                        })}
                    </div>}
                </section>
            </>
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

    let data;
    const options = {
        method: 'GET',
        url: process.env.NEXT_PUBLIC_GET_ALL_CLOUD_IMG,
        params: {
            apiKey: process.env.NEXT_PUBLIC_DB_KEY
        },
        headers: { 'Content-Type': 'application/json' }
    };

    await axios.request(options).then((response) => {
        data = response.data
    }).catch((error) => {
        console.error(error);
    });

    return { props: { imagesFromDb: data } }
}

export default ImageCloud