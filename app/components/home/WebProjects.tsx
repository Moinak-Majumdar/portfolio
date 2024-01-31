import { motion } from 'framer-motion'
import AnimatedHeading from '../others/AnimatedHeading'
import { Ubuntu } from 'next/font/google';
import WebProjectCard from '../others/WebProjectCard';

const ubuntu = Ubuntu({ display: 'swap', weight: ['400', '700'], subsets: ['latin'] });

const outerVariants = {
    open: { transition: { staggerChildren: 0.3, delayChildren: 0.3 } },
    closed: { transition: { staggerChildren: 0.3, staggerDirection: -1 } }
};

const Heading = {
    closed: { opacity: 0.5 },
    open: { opacity: 1, transition: { delay: 0.2 } }
}

type T_data = { _id: string, name: string, type: string, role: string, intro: string, liveUrl: string, gitRepo: string, slug: string, description: string, img: string[], tools: string[], toolsLogo: string[], __v: number, status: string, cover: string }

async function getWebProjects() {
    const uri = process.env.NEXT_PUBLIC_TEST_DB ? `${process.env.NEXT_PUBLIC_SERVER}/getAllWeb?testDb=${process.env.NEXT_PUBLIC_TEST_DB}` : `${process.env.NEXT_PUBLIC_SERVER}/getAllWeb`;

    const res = await fetch(uri, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ apiKey: process.env.NEXT_PUBLIC_DB_KEY }),
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch web project data.");
    }

    return [...await res.json()];
}

export default async function WebProjects() {

    const data: T_data[] = await getWebProjects();

    return (
        <div className='myContainer my-4 md:my-9 xl:my-16 2xl:my-36 rounded-lg shadow-2x dark:text-gray-300 bg-transparent  dark:md:bg-slate-950 dark:shadow-black text-gray-800  md:bg-slate-50 shadow-slate-200' style={ubuntu.style}>
            <motion.div initial='closed' whileInView='open' viewport={{ once: true, amount: 0.2 }} variants={outerVariants} className="p-4 md:p-8 xl:p-16 flex flex-col justify-start">
                <motion.div variants={Heading}>
                    <AnimatedHeading classList="tracking-wide text-lg" title="WEB PROJECTS" />
                    <h1 className="text-4xl md:text-5xl mb-4">
                        Learning<span className="font-bold ml-2">By Building</span>
                    </h1>
                </motion.div>
                <div>
                    {data && <div className="mt-10 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16 relative">
                        {data.map((curr: T_data, index) => {
                            return (
                                <WebProjectCard key={index} data={curr} />
                            )
                        })}
                    </div>}
                </div>
            </motion.div>
        </div>
    )
}