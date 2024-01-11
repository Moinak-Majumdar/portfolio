import DevFlag from "@/app/components/others/DevFlag";
import AnimatedHeading from "@/app/components/others/AnimatedHeading";
import { Ubuntu } from "next/font/google";
import Details from "../components/Details";
import Bg from "../components/Bg";
import { Metadata, ResolvingMetadata } from "next";

const ubuntu = Ubuntu({ display: 'swap', weight: ['400', '700'], subsets: ['latin'] });
type T_Flutter = { _id: string, __v: number, name: string, intro: string, gitRepo: string, slug: string, description: string, release: string, cover: string, img: string[], status: string, badge: string[], libraries: string[] }

async function fetchDetails(slug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/getFlutter?testDb=${process.env.NEXT_PUBLIC_TEST_DB}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: process.env.NEXT_PUBLIC_DB_KEY, slug }),
        next: { revalidate: 3600 }
    })

    if (!res.ok) {
        throw new Error(`Failed to fetch flutter project : ${slug}`)
    }

    return await res.json();
}

export default async function Flutter({ params }: { params: { slug: string } }) {

    const devFlag: boolean = process.env.NEXT_PUBLIC_DEV_FLAG == 'yes' ? true : false;
    const Data: T_Flutter = await fetchDetails(params.slug);


    return (
        <>
            {devFlag && <DevFlag />}
            <main className='relative min-h-screen'>
                <div className='myContainer pt-[4rem] pb-[2rem] dark:text-gray-300 text-gray-700'>
                    <AnimatedHeading classList="mt-8 uppercase" title="Flutter Project" />
                    <h1 style={ubuntu.style} className="font-bold lg:text-5xl text-4xl capitalize">{Data.name}</h1>
                    <Details Data={Data} />
                </div>
                <Bg />
            </main>
        </>
    )
}

type metaDataProps = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata({ params, searchParams }: metaDataProps, parent: ResolvingMetadata): Promise<Metadata> {

    const Data: T_Flutter = await fetchDetails(params.slug);

    return {
        title: `Moinak Majumdar | ${Data.name}`,
        description: Data.intro,
        authors: [{ name: 'Moinak Majumdar', url: 'https://www.linkedin.com/in/moinak-majumdar' }],
        keywords: ['flutter', 'android', 'open source', 'app development', 'mobile app development', 'ios development'],
        openGraph: {
            type: 'website',
            title: `Moinak Majumdar | ${Data.name}`,
            description: Data.intro,
            images: Data.cover,
        }
    }
}