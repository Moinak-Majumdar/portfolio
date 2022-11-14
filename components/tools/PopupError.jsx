import { MdOutlineWarning, MdOutlineHighlightOff } from 'react-icons/md'

const PopupError = ({errors, setErrors}) => {
    return (
        <div className='fixed top-0 left-0 flex min-w-full min-h-screen justify-center items-center z-10'>
            <div className='py-4 px-8 bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-3xl w-fit flex flex-col items-center text-xl shadow-2xl shadow-red-500'>
                <MdOutlineWarning className='text-6xl' />
                <div className='mt-4 flex items-center'>
                    <h1 className='mx-2 text-3xl font-ubuntu'>{errors}</h1>
                    <MdOutlineHighlightOff className='cursor-pointer text-4xl' onClick={() => setErrors(null)} />
                </div>
            </div>
        </div>
    )
}

export default PopupError