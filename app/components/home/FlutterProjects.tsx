import { Variants, motion } from "framer-motion";
import AnimatedHeading from "../others/AnimatedHeading";
import { Ubuntu } from 'next/font/google';
import FlutterCard from "../others/FlutterCard";

const ubuntu = Ubuntu({ display: 'swap', weight: ['400', '700'], subsets: ['latin'] });

const outerVariants = {
    open: { transition: { staggerChildren: 0.3, delayChildren: 0.3 } },
    closed: { transition: { staggerChildren: 0.3, staggerDirection: -1 } }
};

const Heading: Variants = {
    closed: { opacity: 0.5 },
    open: { opacity: 1, transition: { delay: 0.2 } }
}

type T_Flutter = { _id: string, __v: number, name: string, intro: string, gitRepo: string, slug: string, description: string, release: string, cover: string, img: string[], status: string, badge: string[], libraries: string[] }

async function getFlutterProjects() {
    const uri = process.env.NEXT_PUBLIC_TEST_DB ? `${process.env.NEXT_PUBLIC_SERVER}/getAllFlutter?testDb=${process.env.NEXT_PUBLIC_TEST_DB}` : `${process.env.NEXT_PUBLIC_SERVER}/getAllFlutter`;

    const res = await fetch(uri, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ apiKey: process.env.NEXT_PUBLIC_DB_KEY }),
        next: { revalidate: 3600 }
    })

    if(!res.ok) {
        throw new Error('Failed to fetch flutter project data.');
    }

    return [...await res.json()];
}

export default async function FlutterProjects() {

    const data: T_Flutter[] = await getFlutterProjects();

    return (
        <div className='myContainer py-[5rem] dark:text-gray-300 text-gray-800' style={ubuntu.style}>
            <motion.div initial='closed' whileInView='open' viewport={{ once: true, amount: 0.2 }} variants={outerVariants} className="flex flex-col justify-start">
                <motion.div variants={Heading}>
                    <AnimatedHeading classList="tracking-wide text-lg" title="FLUTTER PROJECTS" />
                    <h1 className="text-4xl md:text-5xl mb-4">
                        Mobile App<span className="font-bold ml-2">Development</span>
                    </h1>
                </motion.div>
                <div className="md:px-8">
                    {data && data.map((elm) => {
                        return (
                            <div className="mt-10" key={elm.slug}>
                                <FlutterCard info={elm} />
                            </div>
                        )
                    })}
                </div>
            </motion.div>
        </div>
    )
} 