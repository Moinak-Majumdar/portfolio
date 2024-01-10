'use client'

import { useFont } from '@/context/FontProvider';
import { useRef } from 'react';
import { MdError } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const DevFlag = () => {
    const modalRef = useRef<HTMLDialogElement>(null);
   
    const { lato, comicNeue } = useFont();
    const darkMode = useSelector((s: RootState) => s.darkMode.mode);
    const text = ['R', 'E', 'A', 'D', 'M', 'E'];

    return (

        <section className="fixed top-0 left-0 z-50 min-h-screen w-fit flex justify-center items-center">
            <button onClick={() => modalRef.current?.showModal()} className="bg-gradient-to-b from-[#f7ba2c] to-[#d3321d] flex flex-col py-4 px-[2px] md:px-2 rounded-lg cursor-pointer">
                <MdError className='text-xl md:text-3xl text-white mb-2 animate-pulse' />
                {text.map((curr, i) => {
                    return <h2 key={`${curr}+_+${i}`} className='mx-auto font-bold text-sm sm:text-base' style={lato.style}>
                        {curr}
                    </h2>
                })}
            </button>
            <dialog ref={modalRef} className={` m-auto p-4 rounded-3xl w-[20rem] sm:w-30r lg:w-35r  ${darkMode ? 'bg-gradient-to-tr from-[#471069] to-[#30c5d2] text-slate-300' : 'bg-gradient-to-bl from-[#f2f3e2] via-[#b2e5f8] to-[#f4b3ef] text-gray-700'}`}>
                <h1 className={`text-2xl ${comicNeue.className} ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Sorry !</h1>
                <p className='mt-4' style={lato.style}>This website or the backend server is currently under development, Some pictures may not load or you may experienced some blank pages.</p>
                <button className={`mt-6 text-xl px-4 py-2 rounded-md bg-opacity-20 sm:hover:bg-opacity-30 ${darkMode ? ' bg-black' : 'bg-slate-400'}`} style={lato.style} onClick={() => modalRef.current?.close()}>Close</button>
            </dialog>
        </section>

    )
}

export default DevFlag